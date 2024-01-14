import * as z from 'zod';

export const RecruiterSchema = z.object({
  id: z.number(),
  name: z.string(),
  surname: z.string(),
  email: z.string(),
  technologies: z.array(z.string()).nullable(),
  position: z.string(),
});

const TechnicalRecruiterSchema = RecruiterSchema.extend({
  technologies: z.array(z.string()),
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
  technologies: z
    .array(
      z.string().min(1, {
        message: 'Technology name can not be empty',
      }),
    )
    .nullable(),
});

export const TechnicalRecruiterListSchema = z.array(TechnicalRecruiterSchema);
export const RecruiterListSchema = z.array(RecruiterSchema);

export type ITechnicalRecruiter = z.infer<typeof TechnicalRecruiterSchema>;
export type IRecruiter = z.infer<typeof RecruiterSchema>;
export type IRecruiterInputForm = z.infer<typeof RecruiterInputFormSchema>;
