import * as z from 'zod';

const RequirementsParsingSchema = z.record(z.number().min(1).max(5));

export const JobOfferSchema = z
  .object({
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
  })
  .nullable();

export const JobOffersListSchema = z.array(JobOfferSchema);

export type IJobOffer = z.infer<typeof JobOfferSchema>;
