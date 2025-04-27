/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";
import PDFParser from "pdf2json";

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
        const tempFilePath = `./${fileName}.pdf`;

        // Convert file to buffer and save temporarily
        const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());
        await fs.writeFile(tempFilePath, fileBuffer);

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
        await fs.unlink(tempFilePath);

        // Return the parsed data
        const response = new NextResponse(JSON.stringify(parsedData));
        response.headers.set("FileName", fileName);
        return response;

    } catch (error) {
        console.error('Error processing PDF:', error);
        return new NextResponse("Error processing PDF", { status: 500 });
    }
}