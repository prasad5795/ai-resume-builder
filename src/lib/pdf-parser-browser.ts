// lib/pdf-parser-browser.ts
import * as pdfjsLib from 'pdfjs-dist';

// This is a browser-side only PDF parser for client-side text extraction
export class BrowserPDFParser {
    constructor() {
        if (typeof window !== 'undefined') {
            pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
        }
    }

    async extractTextFromPDF(file: File): Promise<string> {
        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

            let fullText = '';

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();

                // Better text extraction that preserves structure
                let lastY: number | null = null;
                let pageText = '';

                textContent.items.forEach((item) => {
                    // Check if the item has the properties we need
                    if ('str' in item && 'transform' in item) {
                        // Check if we need a line break
                        if (lastY !== null && Math.abs(lastY - item.transform[5]) > 5) {
                            pageText += '\n';
                        }

                        // Add the text
                        pageText += item.str + ' ';
                        lastY = item.transform[5];
                    }
                });

                fullText += pageText + '\n\n';
            }

            return fullText.trim();
        } catch (error) {
            console.error('Error extracting text from PDF:', error);
            throw new Error('Failed to extract text from PDF');
        }
    }
}

// Alternative parser using pdf-parse for server-side
export class ServerPDFParser {
    async extractTextFromBuffer(buffer: Buffer): Promise<string> {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const pdfParse = require('pdf-parse');

        try {
            const data = await pdfParse(buffer);
            return data.text;
        } catch (error) {
            console.error('Error parsing PDF:', error);
            throw new Error('Failed to parse PDF');
        }
    }
}
