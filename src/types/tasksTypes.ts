import * as z from 'zod';

export const PracticalTaskSolutionSchema = z.object({
  compilationLanguage: z.string().min(1, { message: 'Compilation language is required' }),
  bruteForceSolution: z.string().nullable(),
  mediumSolution: z.string().nullable(),
  bestSolution: z.string().nullable(),
});

export const publicPracticalTaskItemSchema = z.object({
  id: z.number(),
  practicalTaskSolutions: z.array(PracticalTaskSolutionSchema),
  codeRelatedToQuestion: z.string(),
  question: z.string(),
  difficultyLevel: z.number(),
  tag: z.string(),
  hint: z.string().nullable(),
  input: z.string().nullable(),
  output: z.string().nullable(),
  isPrivate: z.boolean(),
});

export const publicTheoreticalTaskItemSchema = z.object({
  id: z.number(),
  question: z.string(),
  difficultyLevel: z.number(),
  tag: z.string(),
  hint: z.string().nullable(),
  isPrivate: z.boolean(),
  optionA: z.string(),
  optionB: z.string(),
  optionC: z.string().nullable(),
  optionD: z.string().nullable(),
  answer: z.number().nullable(),
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

export const PracticalTaskFormInputSchema = z.object({
  question: z.string().min(1, { message: 'Question is required' }),
  difficultyLevel: z.number({
    required_error: 'Difficulty level is required',
  }),
  tag: z.string().min(1, { message: 'Tag is required' }),
  hint: z.string().min(1, { message: 'Hint is required' }),
  input: z.string(),
  output: z.string().min(1, { message: 'Output is required' }),
  isPrivate: z.boolean({
    required_error: 'Private is required',
  }),
  codeRelatedToQuestion: z.string().min(1, { message: 'Code related to question is required' }),
  practicalTaskSolutions: z
    .array(
      PracticalTaskSolutionSchema.refine(
        (data) => data.bruteForceSolution || data.bestSolution || data.mediumSolution,
        {
          message: 'At least one solution is required',
          path: ['root'],
        },
      ),
    )
    .min(1, { message: 'At least one practical solution is required' }),
});

export const TheoreticalTaskFormInputSchema = z
  .object({
    question: z.string().min(1, { message: 'Question is required' }),
    difficultyLevel: z.number({
      required_error: 'Difficulty level is required',
    }),
    tag: z.string().min(1, { message: 'Tag is required' }),
    hint: z.string().min(1, { message: 'Hint is required' }),
    answer: z.number({
      required_error: 'Answer is required',
    }),
    optionA: z.string().min(1, { message: 'Option A is required' }),
    optionB: z.string().min(1, { message: 'Option B is required' }),
    optionC: z.string(),
    optionD: z.string(),
    isPrivate: z.boolean({
      required_error: 'Private is required',
    }),
  })
  .refine(
    (data) => {
      console.log(data.answer);
      if (data.answer === 3) {
        return data.optionC;
        // TODO: Check czemu to nie dziala
      }
      if (data.answer === 4) {
        return data.optionD;
      }
      return true;
    },
    {
      message: 'Answer option needs to be filled on existing answer',
      path: ['answer'],
    },
  );

export type IPublicPracticalTask = z.infer<typeof publicPracticalTaskItemSchema>;
export type IFilteringTechnology = z.infer<typeof filteringTechnologySchema>;
export type ISupportedTechnology = z.infer<typeof supportedTechnologySchema>;
export type IPublicTheoreticalTask = z.infer<typeof publicTheoreticalTaskItemSchema>;

export type IPracticalTaskFormInput = z.infer<typeof PracticalTaskFormInputSchema>;
export type ITheoreticalTaskFormInput = z.infer<typeof TheoreticalTaskFormInputSchema>;
