// lib/pdf-parser.ts
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { Resume, resumeSchema } from "@/app/types/resume";
import pdfParse from 'pdf-parse';

export class PDFParserService {
    private model: ChatOpenAI;

    constructor() {
        this.model = new ChatOpenAI({
            modelName: "gpt-4-turbo-preview",
            temperature: 0.1,
            openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        });
    }

    async extractTextFromPDF(file: File): Promise<string> {
        try {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const pdfData = await pdfParse(buffer);
            return pdfData.text;
        } catch (error) {
            console.error('Error extracting text from PDF:', error);
            throw new Error('Failed to extract text from PDF');
        }
    }

    // Parse extracted text into structured resume format
    async parseResumeText(text: string): Promise<Resume> {
        const parser = StructuredOutputParser.fromZodSchema(resumeSchema);

        const prompt = new PromptTemplate({
            template: `You are an expert resume parser. Extract structured information from the following resume text.
      
Important parsing rules:
1. Extract all contact information including name, email, phone, location, and social links
2. For work experience, include company name, position, dates, and achievements
3. For education, include institution, degree, field of study, and dates
4. Categorize skills into technical and soft skills
5. Extract projects with descriptions and technologies used
6. Identify any certifications with issuer and dates
7. If information is missing, omit that field rather than making assumptions
8. Parse dates in YYYY-MM format when possible
9. For current positions, set endDate as "Present" and current as true

Resume text:
{resumeText}

{format_instructions}

Provide the extracted information in the requested JSON format.`,
            inputVariables: ["resumeText"],
            partialVariables: { format_instructions: parser.getFormatInstructions() },
        });

        const chain = RunnableSequence.from([
            prompt,
            this.model,
            parser,
        ]);

        try {
            const result = await chain.invoke({ resumeText: text });
            return result;
        } catch (error) {
            console.error('Error parsing resume:', error);
            throw new Error('Failed to parse resume content');
        }
    }

    // Validate parsed resume data
    validateParsedResume(data: unknown): Resume {
        try {
            return resumeSchema.parse(data);
        } catch (error) {
            console.error('Resume validation error:', error);
            throw new Error('Invalid resume data structure');
        }
    }

    // Main function to process PDF resume
    async processPDFResume(file: File): Promise<Resume> {
        try {
            // Step 1: Extract text from PDF
            const extractedText = await this.extractTextFromPDF(file);

            // Step 2: Parse text into structured format
            const parsedResume = await this.parseResumeText(extractedText);

            // Step 3: Validate the parsed data
            const validatedResume = this.validateParsedResume(parsedResume);

            return validatedResume;
        } catch (error) {
            console.error('Error processing PDF resume:', error);
            throw error;
        }
    }
}

// Helper function for formatting dates
export function formatDate(date: string): string {
    if (date.toLowerCase() === 'present') return 'Present';
    try {
        const [year, month] = date.split('-');
        return `${month}/${year}`;
    } catch {
        return date;
    }
}
