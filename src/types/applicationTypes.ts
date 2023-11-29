import * as z from 'zod';

export const CandidateApplicationSchema = z.object({
  applicationId: z.number(),
  isAccepted: z.boolean().nullable(),
  jobOfferTitle: z.string(),
  candidateSurname: z.string(),
  candidateName: z.string(),
  candidateEmail: z.string(),
});

export const RecruiterApplicationSchema = z.object({
  applicationId: z.number(),
  isAccepted: z.boolean().nullable(),
  jobOfferTitle: z.string(),
  candidateSurname: z.string(),
  candidateName: z.string(),
  candidateEmail: z.string(),
});

export const CandidateApplicationListSchema = z.array(CandidateApplicationSchema);

export const RecuirterApplicationListSchema = z.array(RecruiterApplicationSchema);

export type ICandidateApplication = z.infer<typeof CandidateApplicationSchema>;
export type IRecruiterrApplication = z.infer<typeof RecruiterApplicationSchema>;
