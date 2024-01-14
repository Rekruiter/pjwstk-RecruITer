import { IRecruiter, IRecruiterInputForm, RecruiterInputFormSchema } from '@/types/recruiterTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../UI/Button';
import Spinner from '../UI/Spinner/Spinner';
import FormFieldWrapper from '../FormHelpers/FormFieldWrapper';
import RecruiterTechnologiesField from './RecruiterFormFields/RecruiterTechnologiesField';

interface RecruiterFormProps {
  onSubmit: (data: IRecruiterInputForm) => void;
  mutationLoading: boolean;
  defaultValues?: IRecruiter;
}

const RecruiterForm = ({ mutationLoading, onSubmit, defaultValues }: RecruiterFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<IRecruiterInputForm>({
    resolver: zodResolver(RecruiterInputFormSchema),
    defaultValues: {
      name: defaultValues?.name,
      surname: defaultValues?.surname,
      email: defaultValues?.email,
      position: defaultValues?.position,
      technologies: defaultValues?.technologies,
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

  return (
    <form
      onSubmit={formSubmitHandler}
      className="flex min-h-[500px] flex-col items-center justify-between gap-5 bg-dark_blue px-10 py-5 sm:rounded-xl">
      <div className="mx-auto flex w-full flex-wrap gap-4">
        <FormFieldWrapper<IRecruiterInputForm>
          field="name"
          error={errors.name}
          register={register}
          placeholder="Recruiter's name"
        />
        <FormFieldWrapper<IRecruiterInputForm>
          field="surname"
          error={errors.surname}
          register={register}
          placeholder="Recruiter's surname"
        />
        <FormFieldWrapper<IRecruiterInputForm>
          field="email"
          error={errors.email}
          register={register}
          placeholder="Recruiter's email"
        />
        <FormFieldWrapper<IRecruiterInputForm>
          field="position"
          error={errors.position}
          register={register}
          placeholder="Recruiter's position"
        />
        <RecruiterTechnologiesField
          register={register}
          setValue={setValue}
          control={control}
          errors={errors.technologies}
        />
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

export default RecruiterForm;
