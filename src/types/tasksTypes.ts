import * as z from 'zod';

const PracticalTaskSolutionSchema = z.object({
  compilationLanguage: z.string(),
  bruteForceSolution: z.string().nullable(),
  mediumSolution: z.string().nullable(),
  bestSolution: z.string().nullable(),
});

export const publicPracticalTaskItemSchema = z.object({
  id: z.number(),
  practicalTaskSolutions: z.array(PracticalTaskSolutionSchema),
  codeRelatedToQuestion: z.string().nullable(),
  question: z.string(),
  difficultyLevel: z.number(),
  tag: z.string(),
  hint: z.string().nullable(),
  input: z.string().nullable(),
  isPrivate: z.boolean(),
});

export const publicTheoreticalTaskItemSchema = z.object({
  id: z.number(),
  question: z.string(),
  difficultyLevel: z.number(),
  tag: z.string(),
  hint: z.string().nullable(),
  isPrivate: z.boolean(),
  optionA: z.string().nullable(),
  optionB: z.string().nullable(),
  optionC: z.string().nullable(),
  optionD: z.string().nullable(),
});

export const publicPracticalTasksSchema = z.object({
  items: z.array(publicPracticalTaskItemSchema),
  totalCount: z.number(),
  pageNumber: z.number(),
  pageSize: z.number(),
  totalPages: z.number(),
});

export const publicTheoreticalTasksSchema = z.object({
  items: z.array(publicTheoreticalTaskItemSchema),
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

export type IPublicPracticalTask = z.infer<typeof publicPracticalTaskItemSchema>;
export type IFilteringTechnology = z.infer<typeof filteringTechnologySchema>;
export type ISupportedTechnology = z.infer<typeof supportedTechnologySchema>;
export type IPublicTheoreticalTask = z.infer<typeof publicTheoreticalTaskItemSchema>;
