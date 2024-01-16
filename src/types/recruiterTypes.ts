import * as z from 'zod';

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);

const TechnologiesSchema = z.object({
  name: z.string(),
});

export const RecruiterSchema = z.object({
  id: z.number(),
  name: z.string(),
  surname: z.string(),
  email: z.string(),
  technologies: z.array(TechnologiesSchema).nullable(),
  position: z.string(),
  hiredate: z.string().optional(),
  phoneNumber: z.string(),
});

const TechnicalRecruiterSchema = RecruiterSchema.extend({
  technologies: z.array(TechnologiesSchema),
});

export const RecruiterInputFormSchema = z.object({
  name: z.string().min(1, {
    message: 'Name can not be empty',
  }),
  surname: z.string().min(1, {
    message: 'Surname can not be empty',
  }),
  email: z.string().min(1, {
    message: 'Email can not be empty',
  }),
  position: z.string().min(1, {
    message: 'Position name can not be empty',
  }),
  phoneNumber: z.string().regex(phoneRegex, { message: 'Invalid phone number' }),
  technologies: z
    .array(
      z.object({
        name: z.string().min(1, {
          message: 'Technology name can not be empty',
        }),
      }),
    )
    .nullable(),
  hiredate: z
    .string()
    .min(1, {
      message: 'Hiredate can not be empty',
    })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid date format',
    }),
});

export const TechnicalRecruiterListSchema = z.array(TechnicalRecruiterSchema);
export const RecruiterListSchema = z.array(RecruiterSchema);

export type ITechnicalRecruiter = z.infer<typeof TechnicalRecruiterSchema>;
export type IRecruiter = z.infer<typeof RecruiterSchema>;
export type IRecruiterInputForm = z.infer<typeof RecruiterInputFormSchema>;
