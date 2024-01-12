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
  candidateId: z.number(),
  jobOfferId: z.number(),
  jobOfferTitle: z.string(),
  jobOfferTechnologies: z.string().transform((jsonString) => {
    const parsedObject = JSON.parse(jsonString);
    return z.record(z.number().min(1).max(5)).parse(parsedObject);
  }),
  status: z.boolean().nullable(),
  answers: z
    .string()
    .transform((jsonString) => {
      const parsedObject = JSON.parse(jsonString);
      return z.record(z.string()).parse(parsedObject);
    })
    .nullable(),
  dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format',
  }),
  foreginLanguages: z.number(), // TODO: Replace with foreign
  technologies: z.number(),
  jobHistories: z.array(jobHistoriesObjectSchema),
  portfolioLinks: z.array(z.string()),
  introduction: z.string().nullable(),
});

export const CandidateApplicationSchema = z.object({
  jobOfferTitle: z.string(),
  jobOfferId: z.number(),
  companyName: z.string(),
  companyId: z.number(),
  status: z.boolean().nullable(),
});

export const ApplicationListSchema = z.array(ApplicationSchema);

export type IApplication = z.infer<typeof ApplicationSchema>;
