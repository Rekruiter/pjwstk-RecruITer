import * as z from 'zod';
import { authorizedRoles } from '../constants/roles';

export const AuthorizationObjectSchema = z
  .object({
    token: z.string().min(1),
    role: z.enum(authorizedRoles),
  })
  .readonly();

export type IAuthorizationObject = z.infer<typeof AuthorizationObjectSchema>;
