import * as z from 'zod';

const taskSchema = z.object({
  id: z.number(),
  question: z.string(),
  difficultyLevel: z.number().min(1).max(5),
  compilationLanguage: z.string().optional(),
});

const jobOfferSchema = z.object({
  id: z.number(),
  title: z.string(),
  companyName: z.string(),
  location: z.string(),
  minSalary: z.number(),
  maxSalary: z.number().nullable(),
  currency: z.string(),
});

const recruitmentSchema = z.object({
  id: z.number(),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format',
  }),
  companyName: z.string(),
});

const recruiterApplicationsSchema = z
  .array(
    z.object({
      id: z.number(),
      name: z.string(),
      surname: z.string(),
      expectedSalary: z.number(),
      currency: z.string(),
    }),
  )
  .max(5);

const recruiterUpcomingRecruitmentsSchema = z
  .array(
    recruitmentSchema.extend({
      candidateName: z.string(),
      candidateSurname: z.string(),
    }),
  )
  .max(5);

// USER ROLE PANEL SCHEMA

export const UserPanelPageSchema = z.object({
  isVerified: z.boolean(),
  lastTasks: z.array(taskSchema).max(5).optional(),
  jobOffers: z.array(jobOfferSchema).max(5).optional(),
});

// CANDIDATE ROLE PANEL SCHEMA

export const CandidatePanelPageSchema = z.object({
  lastTasks: z.array(taskSchema).max(5),
  jobOffers: z.array(jobOfferSchema).max(5),
  upcomingRecruitments: z
    .array(
      recruitmentSchema.extend({
        jobTitle: z.string(),
      }),
    )
    .max(5),
  recruitmentsInvitations: z.array(recruitmentSchema).max(10),
});

// RECRUITER/TECH-RECRUITER ROLE PANEL SCHEMA

export const RecuiterPanelPageSchema = z.object({
  companyName: z.string(),
  applications: recruiterApplicationsSchema,
  jobOffers: z
    .array(
      jobOfferSchema.extend({
        applicationsCount: z.number(),
      }),
    )
    .max(5),
  upcomingRecruitments: recruiterUpcomingRecruitmentsSchema,
});

// ADMIN ROLE PANEL SCHEMA

export const AdminPanelPageSchema = z.object({
  companyName: z.string(),
  recruiters: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      surname: z.string(),
      email: z.string(),
      currentApplicationsCount: z.number(),
    }),
  ),
  applications: RecuiterPanelPageSchema,
  jobOffers: z
    .array(
      jobOfferSchema.extend({
        applicationsCount: z.number(),
      }),
    )
    .max(5),
  upcomingRecruitments: recruiterUpcomingRecruitmentsSchema,
});

export type IUserPanel = z.infer<typeof UserPanelPageSchema>;
export type ICandidatePanel = z.infer<typeof CandidatePanelPageSchema>;
export type IRecruiterPanel = z.infer<typeof RecuiterPanelPageSchema>;
export type IAdminPanel = z.infer<typeof AdminPanelPageSchema>;
