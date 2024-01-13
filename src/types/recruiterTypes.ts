import * as z from 'zod';

const RecruiterSchema = z.object({
  id: z.number(),
  name: z.string(),
  surname: z.string(),
  email: z.string(),
});

const TechnicalRecruiterSchema = RecruiterSchema.extend({
  technologies: z.array(z.string()),
});

export const TechnicalRecruiterListSchema = z.array(TechnicalRecruiterSchema);

export type ITechnicalRecruiter = z.infer<typeof TechnicalRecruiterSchema>;
