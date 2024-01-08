import { IPracticalTaskFormInput, PracticalTaskFormInputSchema } from '@/types/tasksTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useController, useForm } from 'react-hook-form';
import Spinner from '../UI/Spinner/Spinner';
import Button from '../UI/Button';
import FormFieldWrapper from '../FormHelpers/FormFieldWrapper';
import FormToggleWrapper from '../FormHelpers/FormToggleWrapper';
import PracticalTaskSolutionsField from './NewPracticalTaskFields/PracticalTaskSolutionsField/PracticalTaskSolutionsField';
import DifficultyLevelField from './NewPracticalTaskFields/DifficultyLevelField/DifficultyLevelField';
import CodeRelatedToQuestionField from './NewPracticalTaskFields/CodeRelatedToQuestionField/CodeRelatedToQuestionField';

interface NewPracticalTaskFormProps {
  onSubmit: (data: IPracticalTaskFormInput) => void;
  mutationLoading: boolean;
  defaultValues?: any; //TODO: add type here
}

const NewPracticalTaskForm = ({ mutationLoading, onSubmit, defaultValues }: NewPracticalTaskFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    clearErrors,
  } = useForm<IPracticalTaskFormInput>({
    resolver: zodResolver(PracticalTaskFormInputSchema),
    defaultValues: defaultValues
      ? defaultValues
      : {
          isPrivate: true,
        },
  });

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(
      async (data) => {
        onSubmit(data);
      },
      (e) => {
        console.log(e);
        console.log(getValues());
      },
    )();
  };

  const { field } = useController({
    name: 'isPrivate',
    control,
  });

  return (
    <form
      onSubmit={formSubmitHandler}
      className="flex min-h-[500px] w-full flex-col items-center justify-between gap-5 bg-dark_blue px-10 py-5 sm:rounded-xl xl:w-auto xl:min-w-[800px]">
      <div className="mx-auto flex w-full flex-wrap gap-4">
        <FormFieldWrapper<IPracticalTaskFormInput>
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
        <DifficultyLevelField register={register} error={errors.difficultyLevel} />
        <FormFieldWrapper<IPracticalTaskFormInput>
          field="tag"
          error={errors.tag}
          register={register}
          placeholder="Question tag here"
          className="w-[45%] md:w-[30%]"
        />
        <FormFieldWrapper<IPracticalTaskFormInput>
          field="hint"
          error={errors.hint}
          register={register}
          placeholder="Question hint here"
        />
        <FormFieldWrapper<IPracticalTaskFormInput>
          field="input"
          error={errors.input}
          register={register}
          placeholder="Question input here (Optional)"
        />
        <FormFieldWrapper<IPracticalTaskFormInput>
          field="output"
          error={errors.output}
          register={register}
          placeholder="Question output here"
        />
        <CodeRelatedToQuestionField register={register} error={errors.codeRelatedToQuestion} />
        <PracticalTaskSolutionsField control={control} register={register} clearErrors={clearErrors} />
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

export default NewPracticalTaskForm;
