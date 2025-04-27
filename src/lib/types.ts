/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma } from "@prisma/client";
import { ResumeValues as ValidationResumeValues } from "./validation";

export type ResumeValues = ValidationResumeValues;

export interface EditorFormProps {
  resumeData: ResumeValues;
  setResumeData: (data: any) => void;
}

export const resumeDataInclude = {
  workExperiences: true,
  educations: true,
} satisfies Prisma.ResumeInclude;

export type ResumeServerData = Prisma.ResumeGetPayload<{
  include: typeof resumeDataInclude;
}>;
