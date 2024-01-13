import * as z from 'zod';

const RequirementsParsingSchema = z.record(z.number().min(1).max(5));

export const JobOfferInputSchema = z
  .object({
    title: z.string().min(3, {
      message: 'Title must be at least 3 characters long',
    }),
    location: z.string().min(3, {
      message: 'Location must be at least 3 characters long',
    }),
    isRemote: z.boolean({
      required_error: 'Remote field is required',
    }),
    description: z.string().min(20, {
      message: 'Description must be at least 20 characters long',
    }),
    minSalary: z.number({
      required_error: 'Min salary is required',
    }),
    maxSalary: z
      .number({
        required_error: 'Max salary is required',
      })
      .nullable(),
    currency: z.string().min(1, {
      message: 'You must pick a currency',
    }),
    dateExpires: z
      .string()
      .min(1, {
        message: 'Date expires is required',
      })
      .refine((date) => new Date(date).getTime() > Date.now(), {
        message: 'Date expires must be in the future',
      }),
    requirements: z.array(
      z.object({
        technology: z.string().min(1, {
          message: 'Technology can not be empty',
        }),
        level: z
          .number()
          .min(1, {
            message: 'Level must be picked',
          })
          .max(5, {
            message: 'Level must be picked',
          }),
      }),
    ),
    questions: z.array(
      z.object({
        contents: z.string().min(1, {
          message: 'Question can not be empty',
        }),
      }),
    ),
    seniority: z.string().min(1, {
      message: 'Seniority can not be empty',
    }),
  })
  .refine(
    (data) => {
      if (!data.maxSalary) {
        return true;
      }
      return data.minSalary <= data.maxSalary;
    },
    {
      message: 'Min Salary must be lower than max salary',
      path: ['maxSalary'],
    },
  );

export const JobOfferSchema = z.object({
  id: z.number(),
  idCompany: z.number(),
  companyName: z.string(),
  minSalary: z.number(),
  maxSalary: z.number().nullable(),
  currency: z.string(),
  description: z.string(),
  location: z.string(),
  isRemote: z.boolean(),
  seniority: z.string(),
  dateAdded: z.string().refine(
    (date) => {
      const timestamp = Date.parse(date);
      return !isNaN(timestamp);
    },
    {
      message: 'Invalid date format',
    },
  ),
  dateExpires: z.string().refine(
    (date) => {
      const timestamp = Date.parse(date);
      return !isNaN(timestamp);
    },
    {
      message: 'Invalid date format',
    },
  ),
  requirements: z.string().transform((jsonString) => {
    const parsedObject = JSON.parse(jsonString);
    return RequirementsParsingSchema.parse(parsedObject);
  }),
  title: z.string(),
  questions: z
    .string()
    .transform((jsonString) => {
      const parsedObject = JSON.parse(jsonString);
      return z.array(z.string()).parse(parsedObject);
    })
    .nullable(),
});

const JobOfferPayloadSchema = JobOfferSchema.omit({
  idCompany: true,
  companyName: true,
});

export const JobOffersWithApplicationDetailsSchema = z.object({
  companyJobOfferDto: JobOfferPayloadSchema,
  applicationsDetails: z.array(
    z.object({
      applicationId: z.number(),
      candidateName: z.string(),
      candidateSurname: z.string(),
      candidateEmail: z.string(),
      jobOfferTitle: z.string(),
      isAccepted: z.boolean().nullable(),
    }),
  ),
});

export const ApplyJobOfferSchema = z.object({
  introduceYourself: z.string().min(1, {
    message: 'Introduce yourself is required',
  }),
  answers: z.array(
    z.object({
      question: z.string().min(1, {
        message: 'Question can not be empty',
      }),
      answerToQuestion: z.string().min(1, {
        message: 'Answer is required',
      }),
    }),
  ),
  expectedSalary: z.number({
    required_error: 'Expected salary is required',
  }),
});

const CompanyJobOfferListElementSchema = z.object({
  id: z.number(),
  title: z.string(),
  location: z.string(),
  dateAdded: z.string(),
  dateExpires: z.string(),
  applicationsCount: z.number(),
});

export const CompanyJobOfferListSchema = z.array(CompanyJobOfferListElementSchema);

export const JobOffersListSchema = z.array(JobOfferSchema);

export type IJobOffer = z.infer<typeof JobOfferSchema>;
export type IJobOfferInput = z.infer<typeof JobOfferInputSchema>;
export type IApplyJobOffer = z.infer<typeof ApplyJobOfferSchema>;
export type ICompanyJobOfferListElement = z.infer<typeof CompanyJobOfferListElementSchema>;
export type IJobOfferPayload = z.infer<typeof JobOfferPayloadSchema>;
export type IJobOffersWithApplicationDetailsSchema = z.infer<typeof JobOffersWithApplicationDetailsSchema>;
