import * as z from 'zod';

export const LoginFormInputSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters long',
    })
    .max(16, { message: "Password's length can not be longer than 16 characters" })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/\d/, { message: 'Password must contain at least one number' })
    .regex(/[!@#$%^&*()]/, { message: 'Password must contain at least one special character' })
    .refine((password) => password.trim().length > 0, 'Password can not be empty'),
});

export type ILoginFormInput = z.infer<typeof LoginFormInputSchema>;
