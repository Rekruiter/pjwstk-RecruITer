import * as z from 'zod';

const PracticalTaskSolutionSchema = z.object({
  compilationLanguage: z.string(),
  bruteForceSolution: z.string().nullable(),
  mediumSolution: z.string().nullable(),
  bestSolution: z.string().nullable(),
});

export const PracticalTaskItemSchema = z.object({
  id: z.number(),
  practicalTaskSolutions: z.array(PracticalTaskSolutionSchema),
  codeRelatedToQuestion: z.string().nullable(),
  question: z.string(),
  difficultyLevel: z.number(),
  tag: z.string(),
  hint: z.string().nullable(),
  input: z.string().optional().nullable(), //TODO: Remove optional
  isPrivate: z.boolean(),
});

export const publicPracticalTasksSchema = z.object({
  items: z.array(PracticalTaskItemSchema),
  totalCount: z.number(),
  pageNumber: z.number(),
  pageSize: z.number(),
  totalPages: z.number(),
});

const supportedTechnologySchema = z.object({
  name: z.string(),
  code: z.string(),
});

export const supportedTechnologiesSchema = z.array(supportedTechnologySchema);

const filteringTechnologySchema = supportedTechnologySchema.extend({
  isPicked: z.boolean(),
});

export type IPublicPracticalTask = z.infer<typeof PracticalTaskItemSchema>;
export type IFilteringTechnology = z.infer<typeof filteringTechnologySchema>;
export type ISupportedTechnology = z.infer<typeof supportedTechnologySchema>;
