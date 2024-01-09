import { ITheoreticalTaskFormInput, TheoreticalTaskFormInputSchema } from '@/types/tasksTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Button from '../../UI/Button';
import Spinner from '../../UI/Spinner/Spinner';
import FormFieldWrapper from '../../FormHelpers/FormFieldWrapper';
import DifficultyLevelField from '../TaskFields/DifficultyLevelField/DifficultyLevelField';

interface NewTheoreticalTaskFormProps {
  onSubmit: (data: ITheoreticalTaskFormInput) => void;
  mutationLoading: boolean;
  defaultValues?: any; //TODO: add type here
}

const NewTheoreticalTaskForm = ({ mutationLoading, onSubmit, defaultValues }: NewTheoreticalTaskFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITheoreticalTaskFormInput>({
    resolver: zodResolver(TheoreticalTaskFormInputSchema),
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
      },
    )();
  };

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
        <DifficultyLevelField<ITheoreticalTaskFormInput> register={register} error={errors.difficultyLevel} />

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
