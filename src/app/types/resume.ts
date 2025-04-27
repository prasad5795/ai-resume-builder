// types/resume.ts
import { z } from 'zod';

// Contact Information Schema
export const contactSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^\+?[\d\s-()]+$/, "Invalid phone number").optional(),
    location: z.object({
        city: z.string().optional(),
        state: z.string().optional(),
        country: z.string(),
        postalCode: z.string().optional(),
    }).optional(),
    linkedIn: z.string().url().optional(),
    github: z.string().url().optional(),
    portfolio: z.string().url().optional(),
    personalWebsite: z.string().url().optional(),
});

// Work Experience Schema
export const workExperienceSchema = z.object({
    id: z.string().optional(), // for UI purposes
    companyName: z.string().min(1, "Company name is required"),
    position: z.string().min(1, "Position is required"),
    location: z.string().optional(),
    startDate: z.string(), // Format: YYYY-MM
    endDate: z.string().optional(), // Format: YYYY-MM or "Present"
    current: z.boolean().default(false),
    description: z.string().optional(),
    achievements: z.array(z.string()).default([]),
    technologies: z.array(z.string()).default([]),
    keywords: z.array(z.string()).default([]), // ATS optimization
});

// Education Schema
export const educationSchema = z.object({
    id: z.string().optional(),
    institution: z.string().min(1, "Institution name is required"),
    degree: z.string().min(1, "Degree is required"),
    fieldOfStudy: z.string().min(1, "Field of study is required"),
    location: z.string().optional(),
    startDate: z.string(), // Format: YYYY-MM
    endDate: z.string().optional(), // Format: YYYY-MM or "Expected YYYY-MM"
    gpa: z.number().min(0).max(4.0).optional(),
    honors: z.array(z.string()).default([]),
    relevantCourses: z.array(z.string()).default([]),
});

// Skills Schema
export const skillCategorySchema = z.object({
    category: z.string(), // e.g., "Programming Languages", "Frameworks", "Tools"
    skills: z.array(z.object({
        name: z.string(),
        proficiency: z.enum(["Beginner", "Intermediate", "Advanced", "Expert"]).optional(),
        yearsOfExperience: z.number().optional(),
    })),
});

export const skillsSchema = z.object({
    technical: z.array(skillCategorySchema).default([]),
    soft: z.array(z.string()).default([]),
    languages: z.array(z.object({
        language: z.string(),
        proficiency: z.enum(["Basic", "Conversational", "Professional", "Native"]),
    })).default([]),
});

// Projects Schema
export const projectSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Project name is required"),
    description: z.string(),
    role: z.string().optional(),
    startDate: z.string().optional(), // Format: YYYY-MM
    endDate: z.string().optional(), // Format: YYYY-MM
    technologies: z.array(z.string()).default([]),
    highlights: z.array(z.string()).default([]),
    url: z.string().url().optional(),
    githubUrl: z.string().url().optional(),
});

// Certifications Schema
export const certificationSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Certification name is required"),
    issuer: z.string().min(1, "Issuer is required"),
    issueDate: z.string(), // Format: YYYY-MM
    expirationDate: z.string().optional(), // Format: YYYY-MM
    credentialId: z.string().optional(),
    url: z.string().url().optional(),
});

// Additional Sections
export const publicationSchema = z.object({
    id: z.string().optional(),
    title: z.string(),
    publisher: z.string(),
    date: z.string(), // Format: YYYY-MM
    url: z.string().url().optional(),
    authors: z.array(z.string()).default([]),
});

export const volunteerSchema = z.object({
    id: z.string().optional(),
    organization: z.string(),
    role: z.string(),
    startDate: z.string(), // Format: YYYY-MM
    endDate: z.string().optional(),
    description: z.string().optional(),
    highlights: z.array(z.string()).default([]),
});

// Complete Resume Schema
export const resumeSchema = z.object({
    contact: contactSchema,
    professionalSummary: z.string().optional(),
    workExperience: z.array(workExperienceSchema).default([]),
    education: z.array(educationSchema).default([]),
    skills: skillsSchema,
    projects: z.array(projectSchema).default([]),
    certifications: z.array(certificationSchema).default([]),
    publications: z.array(publicationSchema).default([]),
    volunteer: z.array(volunteerSchema).default([]),
    awards: z.array(z.object({
        id: z.string().optional(),
        title: z.string(),
        issuer: z.string(),
        date: z.string(), // Format: YYYY-MM
        description: z.string().optional(),
    })).default([]),
    interests: z.array(z.string()).default([]),
    references: z.array(z.object({
        name: z.string(),
        position: z.string(),
        company: z.string(),
        email: z.string().email().optional(),
        phone: z.string().optional(),
        relationship: z.string().optional(),
    })).default([]),
    customSections: z.array(z.object({
        title: z.string(),
        content: z.array(z.record(z.string())),
    })).optional(),
});

// ATS Optimization Schema
export const atsOptimizationSchema = z.object({
    targetKeywords: z.array(z.string()),
    industryKeywords: z.array(z.string()),
    skillsToHighlight: z.array(z.string()),
    experienceToEmphasize: z.array(z.string()),
    suggestedSummary: z.string().optional(),
});

// Type exports
export type Contact = z.infer<typeof contactSchema>;
export type WorkExperience = z.infer<typeof workExperienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type SkillCategory = z.infer<typeof skillCategorySchema>;
export type Skills = z.infer<typeof skillsSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type Publication = z.infer<typeof publicationSchema>;
export type Volunteer = z.infer<typeof volunteerSchema>;
export type Resume = z.infer<typeof resumeSchema>;
export type ATSOptimization = z.infer<typeof atsOptimizationSchema>;

// Utility type for form data
export type ResumeFormData = Partial<Resume>;

// Enums for dropdowns
export enum SkillProficiency {
    Beginner = "Beginner",
    Intermediate = "Intermediate",
    Advanced = "Advanced",
    Expert = "Expert"
}

export enum LanguageProficiency {
    Basic = "Basic",
    Conversational = "Conversational",
    Professional = "Professional",
    Native = "Native"
}

export enum DateFormat {
    MonthYear = "YYYY-MM",
    YearOnly = "YYYY",
    Present = "Present",
    Expected = "Expected"
}