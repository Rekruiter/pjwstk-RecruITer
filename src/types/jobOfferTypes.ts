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
    maxSalary: z.number({
      required_error: 'Max salary is required',
    }),
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
    seniority: z.string().min(1, {
      message: 'Seniority can not be empty',
    }),
  })
  .refine((data) => data.minSalary <= data.maxSalary, {
    message: 'Min Salary must be lower than max salary',
    path: ['maxSalary'],
  });

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
});

export const JobOffersListSchema = z.array(JobOfferSchema);

export type IJobOffer = z.infer<typeof JobOfferSchema>;
export type IJobOfferInput = z.infer<typeof JobOfferInputSchema>;
