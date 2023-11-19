import * as z from 'zod';

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);

export const LoginFormInputSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().refine((password) => password.trim().length > 0, 'Password can not be empty'),
});

export const RegisterFormInputSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: 'Name must be at least 3 characters long' })
      .max(20, { message: 'Name can not be longer than 20 characters' }),
    surname: z
      .string()
      .min(3, { message: 'Surname must be at least 3 characters long' })
      .max(20, { message: 'Surname can not be longer than 20 characters' }),
    phoneNumber: z.string().regex(phoneRegex, { message: 'Invalid phone number' }),
    email: z.string().email({ message: 'Invalid email address' }),
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
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const ResetPasswordFormInputSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

export const ResetPasswordConfirmFormInputSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, {
        message: 'Password must be at least 8 characters long',
      })
      .max(16, { message: "Password's length can not be longer than 16 characters" })
      .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
      .regex(/\d/, { message: 'Password must contain at least one number' })
      .regex(/[!@#$%^&*()]/, { message: 'Password must contain at least one special character' })
      .refine((password) => password.trim().length > 0, 'Password can not be empty'),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  });

export type IRegisterFormInput = z.infer<typeof RegisterFormInputSchema>;
export type ILoginFormInput = z.infer<typeof LoginFormInputSchema>;
export type IResetPasswordFormInput = z.infer<typeof ResetPasswordFormInputSchema>;
export type IResetPasswordConfirmFormInput = z.infer<typeof ResetPasswordConfirmFormInputSchema>;
