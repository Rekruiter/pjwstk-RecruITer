import { authorizedRoles } from '@/constants/roles';
import * as z from 'zod';

export const AuthorizationObjectSchema = z
  .object({
    token: z.string().min(1),
    role: z.enum(authorizedRoles),
    // role: z.string(),
    name: z.string(),
  })
  .readonly();

export type IAuthorizationObject = z.infer<typeof AuthorizationObjectSchema>;
