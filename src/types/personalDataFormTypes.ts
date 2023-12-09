import * as z from 'zod';

// const maxFileSize = 5000000;
// const ACCEPTED_CV_TYPES = ['application/pdf', 'image/jpg', 'image/png'];

const jobHistoryObjectSchema = z.object({
  position: z.string(),
  nameOfCompany: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});

export const PersonalDataFormSchema = z.object({
  address: z.string().min(1, {
    message: 'Address is required',
  }),
  jobHistory: z.array(
    z
      .object({
        nameOfCompany: z.string().min(1, {
          message: 'Name of company is required',
        }),
        position: z.string().min(1, {
          message: 'Position is required',
        }),
        startDate: z.string().min(1, { message: 'Start date is required' }).pipe(z.coerce.date()),
        endDate: z
          .string()
          .min(1, {
            message: 'End date is required',
          })
          .pipe(z.coerce.date()),
      })
      .refine((data) => new Date(data.startDate).getTime() < new Date(data.endDate).getTime(), {
        message: 'Start date should be less than end date',
        path: ['startDate'],
      }),
  ),
  portfolioLinks: z.array(
    z.object({
      name: z.string().min(1, {
        message: 'Name is required',
      }),
      linkUrl: z
        .string()
        .min(1, {
          message: 'Link is required',
        })
        .url({
          message: 'Invalid url format',
        }),
    }),
  ),
  status: z.enum(['free', 'hired']),
  dateOfBirth: z.coerce.date(),
  foreignLanguages: z.array(
    z.object({
      name: z.string().min(1, {
        message: 'Language name is required',
      }),
      code: z.bigint(),
      isPicked: z.boolean(),
    }),
  ),
  technologies: z.array(
    z.object({
      name: z.string().min(1, { message: 'Technology name is required' }),
      code: z.bigint(),
      isPicked: z.boolean(),
    }),
  ),
});

export const PersonalDataInputSchema = PersonalDataFormSchema.pick({
  address: true,
  status: true,
  portfolioLinks: true,
}).extend({
  jobHistory: z.array(jobHistoryObjectSchema),
  technologies: z.bigint(),
  foreignLanguages: z.bigint(),
  dateOfBirth: z.string(),
});

export const PersonalDataFetchSchema = z.object({
  address: z.string().nullable(),
  status: z.enum(['free', 'hired']).nullable(),
  portfolioLinks: z.array(
    z.object({
      name: z.string().min(1, {
        message: 'Name is required',
      }),
      linkUrl: z
        .string()
        .min(1, {
          message: 'Link is required',
        })
        .url({
          message: 'Invalid url format',
        }),
    }),
  ),
  dateOfBirth: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid date format',
    })
    .nullable(),
  technologies: z.array(z.string()).nullable(),
  foreignLanguages: z.array(z.string()).nullable(),
  jobHistory: z.array(jobHistoryObjectSchema).nullable(),
  enumTechnologies: z.array(
    z.object({
      name: z.string(),
      code: z.coerce.bigint(),
    }),
  ),
  enumForeignLanguages: z.array(
    z.object({
      name: z.string(),
      code: z.coerce.bigint(),
    }),
  ),
});

export type IPersonalDataFetch = z.infer<typeof PersonalDataFetchSchema>;
export type IPersonalDataInput = z.infer<typeof PersonalDataInputSchema>;
// cv: z
//     .custom<FileList>()
//     .refine((fileList) => fileList.length === 1, 'Expected file')
//     .transform((file) => file[0] as File)
//     .refine((file) => {
//       return file.size <= maxFileSize;
//     }, `File size should be less than 5mb.`)
//     .refine((file) => ACCEPTED_CV_TYPES.includes(file.type), 'Only these types are allowed .jpg, .png, .pdf'),

export type IPersonalDataForm = z.infer<typeof PersonalDataFormSchema>;
