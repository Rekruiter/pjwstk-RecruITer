import * as z from 'zod';

export const JobOfferSchema = z.object({
  id: z.number(),
  idCompany: z.number(),
  companyName: z.string(),
  minSalary: z.number(),
  maxSalary: z.number().nullable(),
  currency: z.enum(['PLN', 'EUR', 'USD']),
  description: z.string(),
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
  requirements: z.string(),
  title: z.string(),
});

export const JobOffersListSchema = z.array(JobOfferSchema);

export type IJobOffer = z.infer<typeof JobOfferSchema>;
