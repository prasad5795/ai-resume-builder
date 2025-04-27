import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { LLMChain } from 'langchain/chains';
import { z } from 'zod';

// Schema for structured resume data
const ResumeDataSchema = z.object({
    personal: z.object({
        fullName: z.string(),
        email: z.string(),
        phone: z.string(),
        linkedin: z.string().optional(),
        website: z.string().optional(),
    }),
    summary: z.string(),
    experience: z.array(z.object({
        company: z.string(),
        role: z.string(),
        dateBegin: z.string(),
        dateEnd: z.string().optional(),
        isCurrent: z.boolean(),
        location: z.string(),
        description: z.array(z.string()),
    })),
    education: z.array(z.object({
        qualification: z.string(),
        date: z.string(),
    })),
    skills: z.array(z.object({
        category: z.string(),
        keywords: z.array(z.string()),
    })),
    certifications: z.array(z.object({
        name: z.string(),
        date: z.string(),
        department: z.string(),
    })),
    projects: z.array(z.object({
        title: z.string(),
        description: z.array(z.string()),
    })),
});

export type ResumeData = z.infer<typeof ResumeDataSchema>;

export class ATSResumeGenerator {
    private llm: ChatOpenAI;

    constructor(openAIApiKey: string) {
        this.llm = new ChatOpenAI({
            openAIApiKey,
            modelName: 'gpt-4o', // or 'gpt-3.5-turbo' for cheaper option
            temperature: 0.3,
        });
    }

    // Extract structured data from the parsed PDF object
    extractResumeData(parsedPDF: any): ResumeData {
        const metadata = parsedPDF.Meta?.Metadata || {};

        // Extract contact information
        const personal = {
            fullName: metadata['rms:rms_contact_fullname'] || '',
            email: metadata['rms:rms_contact_email'] || '',
            phone: metadata['rms:rms_contact_phone'] || '',
            linkedin: metadata['rms:rms_contact_linkedin'] || '',
            website: metadata['rms:rms_contact_website'] || '',
        };

        // Extract experience
        const experience = [];
        const experienceCount = parseInt(metadata['rms:rms_experience_count'] || '0', 10);

        for (let i = 0; i < experienceCount; i++) {
            const descriptionStr = metadata[`rms:rms_experience_${i}_description`] || '';
            const descriptionArray = descriptionStr.split('\n').filter(Boolean);

            experience.push({
                company: metadata[`rms:rms_experience_${i}_company`] || '',
                role: metadata[`rms:rms_experience_${i}_role`] || '',
                dateBegin: metadata[`rms:rms_experience_${i}_datebegin`] || '',
                dateEnd: metadata[`rms:rms_experience_${i}_dateend`] || '',
                isCurrent: metadata[`rms:rms_experience_${i}_iscurrent`] === 'true',
                location: metadata[`rms:rms_experience_${i}_location`] || '',
                description: descriptionArray,
            });
        }

        // Extract education
        const education = [];
        const educationCount = parseInt(metadata['rms:rms_education_count'] || '0', 10);

        for (let i = 0; i < educationCount; i++) {
            education.push({
                qualification: metadata[`rms:rms_education_${i}_qualification`] || '',
                date: metadata[`rms:rms_education_${i}_date`] || '',
            });
        }

        // Extract skills
        const skillsStr = metadata['rms:rms_skill_0_keywords'] || '';
        const skills = [{
            category: 'Technical Skills',
            keywords: skillsStr.split('\n').flatMap(line => line.split(', ')).filter(Boolean),
        }];

        // Extract certifications
        const certifications = [];
        const certificationCount = parseInt(metadata['rms:rms_certification_count'] || '0', 10);

        for (let i = 0; i < certificationCount; i++) {
            certifications.push({
                name: metadata[`rms:rms_certification_${i}_name`] || '',
                date: metadata[`rms:rms_certification_${i}_date`] || '',
                department: metadata[`rms:rms_certification_${i}_department`] || '',
            });
        }

        // Extract projects
        const projects = [];
        const projectCount = parseInt(metadata['rms:rms_project_count'] || '0', 10);

        for (let i = 0; i < projectCount; i++) {
            const descriptionStr = metadata[`rms:rms_project_${i}_description`] || '';
            const descriptionArray = descriptionStr.split('\n').filter(Boolean);

            projects.push({
                title: metadata[`rms:rms_project_${i}_title`] || '',
                description: descriptionArray,
            });
        }

        return {
            personal,
            summary: metadata['rms:rms_summary'] || '',
            experience,
            education,
            skills,
            certifications,
            projects,
        };
    }

    // Generate ATS-friendly resume based on job description
    async generateATSResume(resumeData: ResumeData, jobDescription: string): Promise<string> {
        const prompt = PromptTemplate.fromTemplate(`
        You are an expert ATS (Applicant Tracking System) resume optimizer. Generate an ATS-friendly resume by:
        1. Tailoring the content to match the job description's keywords
        2. Emphasizing relevant skills and experience
        3. Quantifying achievements with metrics
        4. Using standard section headers (Experience, Education, Skills, etc.)
        5. Maintaining a clean, parseable format
    
        Current Resume Data:
        {resumeJSON}
    
        Job Description:
        {jobDescription}
    
        IMPORTANT INSTRUCTIONS:
        - Generate ONLY pure markdown text
        - DO NOT include any code block markers like \`\`\`markdown
        - DO NOT add any additional text or explanations
        - Return ONLY the markdown formatted resume
    
        Generate an ATS-optimized resume in Markdown format. Follow these guidelines:
        - Start with contact information
        - Include a targeted professional summary
        - Highlight experiences most relevant to the job
        - Quantify achievements with metrics from the original resume
        - List skills that match the job requirements
        - Keep formatting simple and ATS-friendly
        - Use standard section headers
        - Ensure all dates are in standard format
        `);

        const chain = new LLMChain({ llm: this.llm, prompt });

        const result = await chain.call({
            resumeJSON: JSON.stringify(resumeData, null, 2),
            jobDescription,
        });

        // Optional: Remove any potential code block markers if they persist
        return result.text.replace(/```markdown\n?|\n?```/g, '').trim();
    }

    // Analyze keyword match between resume and job description
    async analyzeKeywordMatch(resumeData: ResumeData, jobDescription: string): Promise<{
        matchPercentage: number;
        matchedKeywords: string[];
        missingKeywords: string[];
        suggestions: string[];
    }> {
        const prompt = PromptTemplate.fromTemplate(`As an expert in ATS keyword analysis, perform a comprehensive evaluation of the resume against the job description. 
    
    Output STRICTLY in this JSON format:
    {
      "matchPercentage": 0,
      "matchedKeywords": [],
      "missingKeywords": [],
      "suggestions": []
    }
    
    Detailed Analysis Process:
    1. Carefully extract ALL critical keywords from the job description
    2. Meticulously cross-reference these keywords with the resume content
    3. Calculate a precise match percentage based on keyword relevance and coverage
    4. Identify keywords present in the resume
    5. Highlight keywords missing from the resume
    6. Provide actionable suggestions for improvement
    
    Job Description:
    {jobDescription}
    
    Resume Data:
    {resumeJSON}
    
    INSTRUCTIONS:
    - Match percentage should be between 0-100
    - Only use keywords directly relevant to job requirements
    - Suggestions must be specific and actionable
    - DO NOT include any text outside the JSON structure
    - Ensure JSON is valid and parseable
    - Be precise and professional in your analysis`);

        try {
            const chain = new LLMChain({
                llm: this.llm,
                prompt
            });

            const result = await chain.call({
                resumeJSON: JSON.stringify(resumeData, null, 2),
                jobDescription,
            });

            // Clean and parse the result
            const cleanedResult = result.text
                .replace(/```(json)?/g, '')  // Remove code block markers
                .replace(/^\s+|\s+$/g, '');  // Trim whitespace

            // Parse the JSON
            const parsedResult = JSON.parse(cleanedResult);

            // Validate and sanitize the result
            return {
                matchPercentage: Math.min(Math.max(
                    parsedResult.matchPercentage ?? 0,
                    0
                ), 100),
                matchedKeywords: Array.isArray(parsedResult.matchedKeywords)
                    ? parsedResult.matchedKeywords
                    : [],
                missingKeywords: Array.isArray(parsedResult.missingKeywords)
                    ? parsedResult.missingKeywords
                    : [],
                suggestions: Array.isArray(parsedResult.suggestions)
                    ? parsedResult.suggestions
                    : ["No specific suggestions available"]
            };
        } catch (error) {
            console.error('Keyword Analysis Error:', error);

            return {
                matchPercentage: 0,
                matchedKeywords: [],
                missingKeywords: [],
                suggestions: [
                    "Unable to complete comprehensive keyword analysis.",
                    "Please manually review resume alignment with job description.",
                    "Potential parsing or language model response issues detected."
                ]
            };
        }
    }
}