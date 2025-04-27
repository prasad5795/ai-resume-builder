/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";
import PDFParser from "pdf2json";
import { put } from "@vercel/blob";
import path from "path";
import os from "os";

export async function POST(req: NextRequest) {
    const formData: FormData = await req.formData();
    const uploadedFile = formData.get('file') as File;

    if (!uploadedFile) {
        console.log('No files found.');
        return new NextResponse("No File Found", { status: 404 });
    }

    if (uploadedFile.type !== 'application/pdf') {
        console.log('Uploaded file is not in the expected format.');
        return new NextResponse("Uploaded file is not in the expected format.", {
            status: 500,
        });
    }

    try {
        const fileName = uuidv4();

        // Use temp directory which is available in both local and serverless environments
        const tempDir = process.env.VERCEL ? '/tmp' : os.tmpdir();
        const tempFilePath = path.join(tempDir, `${fileName}.pdf`);

        // Convert file to buffer and save temporarily
        const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());
        await fs.writeFile(tempFilePath, fileBuffer);

        // Optional: Upload to Vercel Blob for persistent storage
        let blobUrl = null;
        if (process.env.BLOB_READ_WRITE_TOKEN && process.env.NODE_ENV === 'production') {
            try {
                const blob = await put(`${fileName}.pdf`, fileBuffer, {
                    access: 'public',
                });
                blobUrl = blob.url;
            } catch (blobError) {
                console.error('Error uploading to Vercel Blob:', blobError);
                // Continue with PDF processing even if blob upload fails
            }
        }

        // Parse PDF
        const pdfParser = new (PDFParser as any)(null, 1);

        // Set up promise to handle parsing
        const parsedData = await new Promise((resolve, reject) => {
            pdfParser.on("pdfParser_dataError", (errData: any) => {
                console.error("PDF parsing error:", errData.parserError);
                reject(errData.parserError);
            });

            pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
                console.log("PDF parsing complete");
                resolve(pdfData);
            });

            pdfParser.loadPDF(tempFilePath);
        });

        // Clean up temp file
        try {
            await fs.unlink(tempFilePath);
        } catch (unlinkError) {
            console.error('Error deleting temp file:', unlinkError);
            // Continue execution even if cleanup fails
        }

        // Return the parsed data with optional blob URL
        const responseData = {
            parsedData,
            blobUrl // Will be null if blob upload wasn't performed
        };

        const response = new NextResponse(JSON.stringify(responseData));
        response.headers.set("FileName", fileName);
        return response;

    } catch (error) {
        console.error('Error processing PDF:', error);
        return new NextResponse("Error processing PDF", { status: 500 });
    }
}