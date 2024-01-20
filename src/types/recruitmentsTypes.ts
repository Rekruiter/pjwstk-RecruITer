import * as z from 'zod';
import { PracticalTaskSolutionSchema } from './tasksTypes';

export const RecruiterRecruitmentSchema = z.object({
  id: z.number(),
  applicationId: z.number(),
  date: z.string().transform((date) => `${date}Z`),
  dateTechnical: z
    .string()
    .transform((date) => `${date}Z`)
    .nullable(),
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
  practicalTasks: z
    .array(
      z.object({
        id: z.number(),
        companyId: z.number().nullable(),
        question: z.string(),
        practicalTaskSolutions: z.array(PracticalTaskSolutionSchema),
        codeRelatedToQuestion: z.string().nullable(),
        input: z.string().nullable(),
        output: z.string().nullable(),
        difficultyLevel: z.number().min(1).max(5),
        tag: z.string().nullable(),
        hint: z.string().nullable(),
        isPrivate: z.boolean(),
      }),
    )
    .nullable(),
  theoreticalTasks: z
    .array(
      z.object({
        id: z.number(),
        companyId: z.number(),
        question: z.string(),
        answer: z.number(),
        optionA: z.string(),
        optionB: z.string(),
        optionC: z.string().nullable(),
        optionD: z.string().nullable(),
        difficultyLevel: z.number().min(1).max(5),
        tag: z.string().nullable(),
        hint: z.string().nullable(),
        isPrivate: z.boolean(),
      }),
    )
    .nullable(),
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

export const ManageTasksForRecruitmentSchema = z.object({
  tasks: z.array(
    z.object({
      idTask: z.number(),
      question: z.string(),
    }),
  ),
});

export const RecruitmentCandidateSchema = z.object({
  id: z.number(),
  date: z.string().transform((date) => `${date}Z`),
  dateTechnical: z
    .string()
    .transform((date) => `${date}Z`)
    .nullable(),
  jobOfferTitle: z.string(),
  companyName: z.string(),
  recruiterName: z.string().nullable(),
  recruiterSurname: z.string().nullable(),
  applicationId: z.number(),
});

export const RecruitmentLinkSchema = z.object({
  meetingLink: z.string().nullable(),
});

export const RecruitmentFeedbackFormSchema = z.object({
  feedback: z.string().min(1, {
    message: 'Feedback can not be empty',
  }),
});

export const RecruiterRecruitmentListSchema = z.array(RecruiterRecruitmentSchema);

export type IRecruiterRecruitment = z.infer<typeof RecruiterRecruitmentSchema>;
export type IInviteCandidateForRecruitment = z.infer<typeof InviteCandidateForRecruitmentSchema>;
export type IManageTasksForRecruitment = z.infer<typeof ManageTasksForRecruitmentSchema>;
export type IRecruitmentFeedback = z.infer<typeof RecruitmentFeedbackFormSchema>;
