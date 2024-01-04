import { IJobOfferInput, JobOfferInputSchema } from '@/types/jobOfferTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import FormFieldWrapper from '../FormHelpers/FormFieldWrapper';
import Button from '../UI/Button';
import Spinner from '../UI/Spinner/Spinner';
import { DescriptionField, LocationField, SalaryField, SeniorityField } from './NewJobOfferFields';
import { MAX_DATE, MIN_DATE } from '@/constants/dateInputValues';
import RequirementsField from './NewJobOfferFields/RequirementsField/RequirementsField';
import QuestionsField from './NewJobOfferFields/QuestionsField/QuestionsField';

interface NewJobOfferFormProps {
  onSubmit: (data: IJobOfferInput) => void;
  mutationLoading: boolean;
}

const NewJobOfferForm = ({ onSubmit, mutationLoading }: NewJobOfferFormProps) => {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    trigger,
  } = useForm<IJobOfferInput>({
    resolver: zodResolver(JobOfferInputSchema),
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

  return (
    <form
      onSubmit={formSubmitHandler}
      className="flex min-h-[500px] w-full flex-col items-center justify-between gap-5 bg-dark_blue px-10 py-5 sm:rounded-xl xl:w-auto xl:min-w-[800px]">
      <div className="mx-auto flex w-full flex-col gap-4">
        <FormFieldWrapper<IJobOfferInput>
          field="title"
          error={errors.title}
          register={register}
          placeholder="Your job offer title here"
        />
        <DescriptionField register={register} error={errors.description} />
        <LocationField register={register} errors={errors} />
        <SalaryField register={register} errors={errors} control={control} />
        <SeniorityField register={register} error={errors.seniority} control={control} />
        <FormFieldWrapper<IJobOfferInput>
          field="dateExpires"
          label="Expiration date"
          error={errors.dateExpires}
          register={register}
          type="date"
          min={MIN_DATE}
          max={MAX_DATE}
        />
        <RequirementsField register={register} control={control} getValues={getValues} trigger={trigger} />
        <QuestionsField register={register} control={control} errors={errors} />
      </div>
      {mutationLoading ? (
        <Spinner isLight />
      ) : (
        <Button type="submit" className="mx-auto" disabled={mutationLoading}>
          Submit
        </Button>
      )}
    </form>
  );
};

export default NewJobOfferForm;
