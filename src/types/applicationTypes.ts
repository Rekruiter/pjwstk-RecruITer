import * as z from 'zod';
import { jobHistoriesObjectSchema } from './personalDataFormTypes';

export const ApplicationSchema = z.object({
  applicationId: z.number(),
  isAccepted: z.boolean().nullable(),
  jobOfferTitle: z.string(),
  candidateSurname: z.string().nullable(),
  candidateName: z.string().nullable(),
  candidateEmail: z.string().nullable(),
  companyName: z.string().nullable(),
});

export const RecruiterApplicationSchema = z.object({
  candidateName: z.string(),
  candidateSurname: z.string(),
  candidateEmail: z.string(),
  phoneNumber: z.string(),
  candidateId: z.number(),
  jobOfferId: z.number(),
  jobOfferTitle: z.string(),
  jobOfferTechnologies: z.array(
    z.object({
      technologyName: z.string(),
      level: z.number(),
    }),
  ),
  status: z.boolean().nullable(),
  answers: z.array(
    z.object({
      question: z.string(),
      answerToQuestion: z.string(),
    }),
  ),
  dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format',
  }),
  foreignLanguages: z.array(z.string()),
  technologies: z.array(z.string()),
  jobHistories: z.array(jobHistoriesObjectSchema),
  portfolioLinks: z.array(
    z.object({
      id: z.number(),
      idCandidate: z.number(),
      name: z.string(),
      linkUrl: z.string(),
    }),
  ),
  introduction: z.string().nullable(),
  // expectedSalary: z.number().nullable(),
});

export const CandidateApplicationSchema = z.object({
  jobOfferTitle: z.string(),
  jobOfferId: z.number(),
  companyName: z.string(),
  companyId: z.number(),
  status: z.boolean().nullable(),
});

export const GetApplicationListSchema = z.object({
  applications: z.array(ApplicationSchema),
  totalPages: z.number(),
});

export type IApplication = z.infer<typeof ApplicationSchema>;
