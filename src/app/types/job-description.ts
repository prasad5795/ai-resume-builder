// types/job-description.ts
import { z } from 'zod';

// Job Description Schema
export const jobDescriptionSchema = z.object({
    jobTitle: z.string().min(1, "Job title is required"),
    company: z.object({
        name: z.string().min(1, "Company name is required"),
        industry: z.string().optional(),
        size: z.string().optional(),
        location: z.string().optional(),
        website: z.string().url().optional(),
    }),
    location: z.object({
        city: z.string().optional(),
        state: z.string().optional(),
        country: z.string().optional(),
        remote: z.boolean().default(false),
        hybrid: z.boolean().default(false),
    }).optional(),
    employmentType: z.enum([
        "Full-time",
        "Part-time",
        "Contract",
        "Temporary",
        "Internship",
        "Freelance"
    ]).optional(),
    experienceLevel: z.enum([
        "Entry Level",
        "Mid Level",
        "Senior Level",
        "Lead",
        "Manager",
        "Director",
        "Executive"
    ]).optional(),
    salaryRange: z.object({
        min: z.number().optional(),
        max: z.number().optional(),
        currency: z.string().default("USD"),
        period: z.enum(["Hourly", "Monthly", "Yearly"]).default("Yearly"),
    }).optional(),
    description: z.string(),
    responsibilities: z.array(z.string()).default([]),
    requirements: z.object({
        education: z.array(z.string()).default([]),
        experience: z.array(z.string()).default([]),
        skills: z.array(z.string()).default([]),
        certifications: z.array(z.string()).default([]),
        softSkills: z.array(z.string()).default([]),
    }),
    preferredQualifications: z.array(z.string()).default([]),
    benefits: z.array(z.string()).default([]),
    keywords: z.array(z.string()).default([]), // Extracted keywords for ATS
    industryKeywords: z.array(z.string()).default([]),
    technicalKeywords: z.array(z.string()).default([]),
    softSkillKeywords: z.array(z.string()).default([]),
    actionVerbs: z.array(z.string()).default([]),
    applicationDeadline: z.string().optional(), // Format: YYYY-MM-DD
    postedDate: z.string().optional(), // Format: YYYY-MM-DD
});

// ATS Analysis Schema
export const atsAnalysisSchema = z.object({
    overallMatch: z.number().min(0).max(100), // Percentage match
    keywordMatches: z.array(z.object({
        keyword: z.string(),
        found: z.boolean(),
        frequency: z.number(),
        section: z.string().optional(), // Where in resume it was found
    })),
    missingKeywords: z.array(z.string()),
    skillsGap: z.array(z.object({
        requiredSkill: z.string(),
        currentLevel: z.string().optional(),
        recommendedAction: z.string(),
    })),
    experienceGap: z.array(z.object({
        requirement: z.string(),
        met: z.boolean(),
        suggestion: z.string().optional(),
    })),
    formatScore: z.number().min(0).max(100), // ATS-friendly format score
    recommendations: z.array(z.object({
        section: z.string(),
        suggestion: z.string(),
        priority: z.enum(["High", "Medium", "Low"]),
    })),
});

// Resume Optimization Strategy Schema
export const optimizationStrategySchema = z.object({
    summaryStrategy: z.object({
        keywords: z.array(z.string()),
        tone: z.string(),
        length: z.number(), // Suggested word count
        emphasis: z.array(z.string()), // Key points to emphasize
    }),
    experienceStrategy: z.array(z.object({
        companyName: z.string(),
        position: z.string(),
        bulletPoints: z.array(z.object({
            original: z.string(),
            optimized: z.string(),
            keywords: z.array(z.string()),
            impact: z.enum(["High", "Medium", "Low"]),
        })),
        reorderPriority: z.number(), // For reordering experiences
    })),
    skillsStrategy: z.object({
        categories: z.array(z.object({
            name: z.string(),
            skills: z.array(z.string()),
            priority: z.number(),
        })),
        missingSkills: z.array(z.string()),
        skillsToHighlight: z.array(z.string()),
    }),
    sectionsToInclude: z.array(z.string()),
    sectionsToExclude: z.array(z.string()),
    customSections: z.array(z.object({
        title: z.string(),
        content: z.string(),
        priority: z.number(),
    })).optional(),
});

// Type exports
export type JobDescription = z.infer<typeof jobDescriptionSchema>;
export type ATSAnalysis = z.infer<typeof atsAnalysisSchema>;
export type OptimizationStrategy = z.infer<typeof optimizationStrategySchema>;

// Enums for dropdowns
export enum EmploymentType {
    FullTime = "Full-time",
    PartTime = "Part-time",
    Contract = "Contract",
    Temporary = "Temporary",
    Internship = "Internship",
    Freelance = "Freelance"
}

export enum ExperienceLevel {
    EntryLevel = "Entry Level",
    MidLevel = "Mid Level",
    SeniorLevel = "Senior Level",
    Lead = "Lead",
    Manager = "Manager",
    Director = "Director",
    Executive = "Executive"
}

export enum Priority {
    High = "High",
    Medium = "Medium",
    Low = "Low"
}

// Helper functions for validation
export const validateJobDescription = (data: unknown): JobDescription => {
    return jobDescriptionSchema.parse(data);
};

export const validateATSAnalysis = (data: unknown): ATSAnalysis => {
    return atsAnalysisSchema.parse(data);
};

export const validateOptimizationStrategy = (data: unknown): OptimizationStrategy => {
    return optimizationStrategySchema.parse(data);
};