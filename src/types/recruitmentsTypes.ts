import * as z from 'zod';

export const RecruiterRecruitmentSchema = z.object({
  id: z.number(),
  date: z.string(),
  dateTechnical: z.string().nullable(),
  state: z.number(),
  jobOfferTitle: z.string(),
  companyName: z.string(),
  candidateName: z.string(),
  candidateSurname: z.string(),
  recruiterName: z.string().nullable(),
  recruiterSurname: z.string().nullable(),
  recruitmentTasks: z.array(
    z.object({
      idTask: z.number(),
    }),
  ),
  practicalTasks: z.array(z.object({})),
  theoreticalTasks: z.array(z.object({})),
});

export const InviteCandidateForRecruitmentSchema = z.object({
  idRecruiter: z.number({
    required_error: 'Recruiter have to be assigned',
  }),
  DateTechnical: z
    .string()
    .min(1, {
      message: 'Date of technical interview have to be assigned',
    })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid date format',
    }),
});

export const RecruiterRecruitmentListSchema = z.array(RecruiterRecruitmentSchema);

export type IRecruiterRecruitment = z.infer<typeof RecruiterRecruitmentSchema>;
export type IInviteCandidateForRecruitment = z.infer<typeof InviteCandidateForRecruitmentSchema>;
