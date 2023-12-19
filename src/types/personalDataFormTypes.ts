import * as z from 'zod';

// const maxFileSize = 5000000;
// const ACCEPTED_CV_TYPES = ['application/pdf', 'image/jpg', 'image/png'];

const jobHistoriesObjectSchema = z.object({
  position: z.string(),
  nameOfCompany: z.string(),
  startDate: z.string(),
  endDate: z.string().nullable(),
});

export const PersonalDataFormSchema = z.object({
  address: z.string().min(1, {
    message: 'Address is required',
  }),
  jobHistories: z.array(
    z
      .object({
        nameOfCompany: z.string().min(1, {
          message: 'Name of company is required',
        }),
        position: z.string().min(1, {
          message: 'Position is required',
        }),
        startDate: z.string().min(1, { message: 'Start date is required' }),
        endDate: z.string().nullable(),
      })
      .refine(
        (data) => {
          if (!data.endDate) return true;
          return new Date(data.startDate).getTime() < new Date(data.endDate).getTime();
        },
        {
          message: 'Start date should be less than end date',
          path: ['startDate'],
        },
      ),
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
  dateOfBirth: z.string(),
  foreignLanguages: z.array(
    z.object({
      name: z.string(),
      isPicked: z.boolean(),
    }),
  ),
  technologies: z.array(
    z.object({
      name: z.string(),
      isPicked: z.boolean(),
    }),
  ),
});

export const PersonalDataInputSchema = PersonalDataFormSchema.pick({
  address: true,
  status: true,
  portfolioLinks: true,
}).extend({
  jobHistories: z.array(jobHistoriesObjectSchema),
  technologies: z.array(z.object({ name: z.string() })),
  foreignLanguages: z.array(z.string()),
  dateOfBirth: z.string(),
});

export const PersonalDataFetchSchema = z.object({
  address: z.string().nullable(),
  status: z.enum(['free', 'hired']).nullable(),
  portfolioLinks: z
    .array(
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
    )
    .nullable(),
  dateOfBirth: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid date format',
    })
    .nullable(),
  technologies: z.array(z.string()).nullable(),
  foreignLanguages: z.array(z.string()).nullable(),
  jobHistories: z.array(jobHistoriesObjectSchema).nullable(),
  allTechnologies: z.array(
    z.object({
      name: z.string(),
      code: z.string(),
    }),
  ),
  allForeignLanguages: z.array(
    z.object({
      name: z.string(),
      code: z.string(),
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
