import { IPublicTheoreticalTask, ITheoreticalTaskFormInput, TheoreticalTaskFormInputSchema } from '@/types/tasksTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useController, useForm } from 'react-hook-form';
import Button from '../../UI/Button';
import Spinner from '../../UI/Spinner/Spinner';
import FormFieldWrapper from '../../FormHelpers/FormFieldWrapper';
import DifficultyLevelField from '../TaskFields/DifficultyLevelField/DifficultyLevelField';
import FormToggleWrapper from '@/components/FormHelpers/FormToggleWrapper';
import { cn } from '@/lib/utils';

interface NewTheoreticalTaskFormProps {
  onSubmit: (data: ITheoreticalTaskFormInput) => void;
  mutationLoading: boolean;
  defaultValues?: IPublicTheoreticalTask;
}

const NewTheoreticalTaskForm = ({ mutationLoading, onSubmit, defaultValues }: NewTheoreticalTaskFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ITheoreticalTaskFormInput>({
    resolver: zodResolver(TheoreticalTaskFormInputSchema),
    defaultValues: defaultValues
      ? {
          question: defaultValues.question,
          difficultyLevel: defaultValues.difficultyLevel,
          hint: defaultValues.hint ? defaultValues.hint : '',
          isPrivate: defaultValues.isPrivate,
          tag: defaultValues.tag,
          optionA: defaultValues.optionA,
          optionB: defaultValues.optionB,
          optionC: defaultValues.optionC ? defaultValues.optionC : '',
          optionD: defaultValues.optionD ? defaultValues.optionD : '',
          answer: defaultValues.answer ? defaultValues.answer : 1,
        }
      : {
          isPrivate: true,
        },
  });

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    if (mutationLoading) {
      return;
    }
    e.preventDefault();
    handleSubmit(
      async (data) => {
        onSubmit(data);
      },
      (e) => {
        console.log(e);
      },
    )();
  };

  const { field } = useController({
    name: 'isPrivate',
    control,
  });

  const { field: answerField } = useController({
    name: 'answer',
    control,
  });

  return (
    <form
      onSubmit={formSubmitHandler}
      className="flex min-h-[500px] w-full flex-col items-center justify-between gap-5 bg-dark_blue px-10 py-5 sm:rounded-xl xl:w-auto xl:min-w-[800px]">
      <div className="mx-auto flex w-full flex-wrap gap-4">
        <FormFieldWrapper<ITheoreticalTaskFormInput>
          field="question"
          error={errors.question}
          register={register}
          placeholder="Your question here"
        />
        <FormToggleWrapper
          label="Visibility"
          isToggled={!field.value}
          untoggledOption="Private"
          toggledOption="Public"
          onChange={(value: boolean) => field.onChange(!value)}
        />
        <DifficultyLevelField<ITheoreticalTaskFormInput> register={register} error={errors.difficultyLevel} />
        <FormFieldWrapper<ITheoreticalTaskFormInput>
          field="tag"
          error={errors.tag}
          register={register}
          placeholder="Question tag here"
          className="w-[45%] md:w-[30%]"
        />
        <FormFieldWrapper<ITheoreticalTaskFormInput>
          field="hint"
          error={errors.hint}
          register={register}
          placeholder="Hint here"
          className="w-[45%] md:w-[30%]"
        />
        <div className="flex w-full gap-5">
          <FormFieldWrapper<ITheoreticalTaskFormInput>
            field="optionA"
            error={errors.optionA}
            register={register}
            placeholder="Write answer here"
            className="w-3/4"
          />
          <button
            className={cn('mb-1 scale-95 transform place-self-end rounded-md bg-light/20 p-2 text-light shadow-md', {
              'bg-orange': answerField.value === 1,
            })}
            type="button"
            onClick={() => answerField.onChange(1)}>
            Correct answer
          </button>
        </div>
        <div className="flex w-full gap-5">
          <FormFieldWrapper<ITheoreticalTaskFormInput>
            field="optionB"
            error={errors.optionB}
            register={register}
            placeholder="Write answer here"
            className="w-3/4"
          />
          <button
            className={cn('mb-1 scale-95 transform place-self-end rounded-md bg-light/20 p-2 text-light shadow-md', {
              'bg-orange': answerField.value === 2,
            })}
            type="button"
            onClick={() => answerField.onChange(2)}>
            Correct answer
          </button>
        </div>
        <div className="flex w-full gap-5">
          <FormFieldWrapper<ITheoreticalTaskFormInput>
            field="optionC"
            error={errors.optionC}
            register={register}
            placeholder="Write answer here"
            className="w-3/4"
          />
          <button
            className={cn('mb-1 scale-95 transform place-self-end rounded-md bg-light/20 p-2 text-light shadow-md', {
              'bg-orange': answerField.value === 3,
            })}
            type="button"
            onClick={() => answerField.onChange(3)}>
            Correct answer
          </button>
        </div>
        <div className="flex w-full gap-5">
          <FormFieldWrapper<ITheoreticalTaskFormInput>
            field="optionD"
            error={errors.optionD}
            register={register}
            placeholder="Write answer here"
            className="w-3/4"
          />
          <button
            className={cn('mb-1 scale-95 transform place-self-end rounded-md bg-light/20 p-2 text-light shadow-md', {
              'bg-orange': answerField.value === 4,
            })}
            type="button"
            onClick={() => answerField.onChange(4)}>
            Correct answer
          </button>
        </div>
        {errors.answer && <div className="text-error_color">{errors.answer.message}</div>}
        {mutationLoading ? (
          <Spinner isLight />
        ) : (
          <Button type="submit" className="mx-auto" disabled={mutationLoading}>
            Submit
          </Button>
        )}
      </div>
    </form>
  );
};

export default NewTheoreticalTaskForm;
