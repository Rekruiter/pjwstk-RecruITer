import * as z from 'zod';
import { authorizedRoles } from '../constants/roles';

export const TemporaryAuthorizationObjectSchema = z.object({
  token: z.string().min(1),
  name: z.string(),
});

export const AuthorizationObjectSchema = z
  .object({
    token: z.string().min(1),
    role: z.enum(authorizedRoles),
    name: z.string(),
  })
  .readonly();

export type ITemporaryAuthorizationObject = z.infer<typeof TemporaryAuthorizationObjectSchema>;
export type IAuthorizationObject = z.infer<typeof AuthorizationObjectSchema>;
