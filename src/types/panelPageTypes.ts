import * as z from 'zod';

const taskSchema = z.object({
  id: z.number(),
  question: z.string(),
  difficultyLevel: z.number().min(1).max(5),
  compilationLanguage: z.string().nullable(),
});

const jobOfferSchema = z.object({
  id: z.number(),
  title: z.string(),
  location: z.string(),
});

const recruitmentSchema = z.object({
  id: z.number(),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format',
  }),
});

const recruiterApplicationsSchema = z
  .array(
    z.object({
      id: z.number(),
      candidateName: z.string(),
      candidateSurname: z.string(),
      expectedSalary: z.number().nullable(),
      jobOfferTitle: z.string(),
      currency: z.string(),
    }),
  )
  .max(5);

const candidateUpcomingRecruitmentsSchema = z.array(
  recruitmentSchema.extend({
    jobTitle: z.string(),
    companyName: z.string(),
  }),
);

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
  lastPracticalTasks: z.array(taskSchema).max(5).nullable(),
  lastTheoreticalTasks: z.array(taskSchema).max(5).nullable(),
  jobOffers: z
    .array(
      jobOfferSchema.extend({
        companyName: z.string(),
        minSalary: z.number(),
        maxSalary: z.number().nullable(),
        currency: z.string(),
      }),
    )
    .max(5)
    .nullable(),
});

// CANDIDATE ROLE PANEL SCHEMA

export const CandidatePanelPageSchema = z.object({
  lastPracticalTasks: z.array(taskSchema).max(5),
  lastTheoreticalTasks: z.array(taskSchema).max(5),
  jobOffers: z
    .array(
      jobOfferSchema.extend({
        companyName: z.string(),
        minSalary: z.number(),
        maxSalary: z.number().nullable(),
        currency: z.string(),
      }),
    )
    .max(5),
  upcomingRecruitments: candidateUpcomingRecruitmentsSchema.max(5),
  recruitmentInvitations: candidateUpcomingRecruitmentsSchema.max(10),
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
  recruitments: recruiterUpcomingRecruitmentsSchema,
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
  applications: recruiterApplicationsSchema,
  jobOffers: z
    .array(
      jobOfferSchema.extend({
        applicationsCount: z.number(),
      }),
    )
    .max(5),
  recruitments: recruiterUpcomingRecruitmentsSchema,
});

export type IUserPanel = z.infer<typeof UserPanelPageSchema>;
export type ICandidatePanel = z.infer<typeof CandidatePanelPageSchema>;
export type IRecruiterPanel = z.infer<typeof RecuiterPanelPageSchema>;
export type IAdminPanel = z.infer<typeof AdminPanelPageSchema>;
