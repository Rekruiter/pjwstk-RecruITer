import * as z from 'zod';

// const maxFileSize = 5000000;
// const ACCEPTED_CV_TYPES = ['application/pdf', 'image/jpg', 'image/png'];

export const PersonalDataFormSchema = z.object({
  address: z.string().min(1, {
    message: 'Address is required',
  }),
  jobHistory: z.array(
    z.object({
      nameOfCompany: z.string().min(1, {
        message: 'Name of company is required',
      }),
      position: z.string().min(1, {
        message: 'Position is required',
      }),
      startDate: z
        .string()
        .min(1, {
          message: 'Start date is required',
        })
        .refine((date) => !isNaN(Date.parse(date)), {
          message: 'Invalid date format',
        }),
      endDate: z
        .string()
        .min(1, {
          message: 'End date is required',
        })
        .refine((date) => !isNaN(Date.parse(date)), {
          message: 'Invalid date format',
        }),
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
  dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format',
  }),
  foreignLanguages: z.array(
    z.object({
      language: z.string().min(1, {
        message: 'Language is required',
      }),
      code: z.number(),
      isPicked: z.boolean(),
    }),
  ),
  technologies: z.array(
    z.object({
      name: z.string().min(1, { message: 'Technology name is required' }),
      code: z.number(),
      isPicked: z.boolean(),
    }),
  ),
});

// cv: z
//     .custom<FileList>()
//     .refine((fileList) => fileList.length === 1, 'Expected file')
//     .transform((file) => file[0] as File)
//     .refine((file) => {
//       return file.size <= maxFileSize;
//     }, `File size should be less than 5mb.`)
//     .refine((file) => ACCEPTED_CV_TYPES.includes(file.type), 'Only these types are allowed .jpg, .png, .pdf'),

export const DEFAULT_PERSONAL_DATA_FORM_VALUES: Partial<IPersonalDataForm> = {
  status: 'free',
};

export type IPersonalDataForm = z.infer<typeof PersonalDataFormSchema>;
