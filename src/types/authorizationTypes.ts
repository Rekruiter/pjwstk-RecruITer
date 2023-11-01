import * as z from 'zod';

export const AuthorizationObjectSchema = z.object({
  token: z.string(),
  role: z.union([
    z.literal('user'),
    z.literal('candidate'),
    z.literal('tech-recruiter'),
    z.literal('recruiter'),
    z.literal('admin'),
    z.literal('guest'),
  ]),
});

export type IAuthorizationObject = z.infer<typeof AuthorizationObjectSchema>;
