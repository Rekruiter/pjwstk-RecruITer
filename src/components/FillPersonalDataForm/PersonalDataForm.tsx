import { getPersonalDataInputForm } from '@/api/personalData/personalDataForm';
import {
  IPersonalDataFetch,
  IPersonalDataForm,
  IPersonalDataInput,
  PersonalDataFormSchema,
} from '@/types/personalDataFormTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useController, useForm } from 'react-hook-form';
import FormFieldWrapper from '../FormHelpers/FormFieldWrapper';
import FormToggleWrapper from '../FormHelpers/FormToggleWrapper';
import TechnologiesField from './Technologies/TechnologiesField';
import ForeignLanguagesField from './ForeignLanguages/ForeignLanguagesField';
import PortfolioLinksField from './PortfolioLinks/PortfolioLinksField';
import JobHistoryField from './JobHistory/JobHistoryField';
import Button from '../UI/Button';
import { MAX_DATE, MIN_DATE } from '@/constants/dateInputValues';
import Spinner from '../UI/Spinner/Spinner';
import { IoMdArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

interface PersonalDataFormProps {
  handlePersonalDataPost: (inputData: IPersonalDataInput) => void;
  mutationLoading: boolean;
  data: IPersonalDataFetch;
}

const PersonalDataForm = ({ data, handlePersonalDataPost, mutationLoading }: PersonalDataFormProps) => {
  const navigate = useNavigate();
  const { allForeignLanguages, allTechnologies, ...personalData } = data;

  const defaultValues = personalData;
  const defaultTechnologies: IPersonalDataForm['technologies'] = allTechnologies.map((technology) => {
    return {
      name: technology.name,
      isPicked: personalData.technologies?.includes(technology.name) ?? false,
    };
  });
  const defaultForeignLanguages: IPersonalDataForm['foreignLanguages'] = allForeignLanguages.map((language) => {
    return {
      name: language.name,
      code: language.code,
      isPicked: personalData.foreignLanguages?.includes(language.name) ?? false,
    };
  });
  const defaultJobHistories: IPersonalDataForm['jobHistories'] =
    defaultValues.jobHistories?.map((history) => {
      return {
        startDate: history.startDate.slice(0, 10),
        endDate: history.endDate ? history.endDate.slice(0, 10) : null,
        nameOfCompany: history.nameOfCompany,
        position: history.position,
      };
    }) ?? [];

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IPersonalDataForm>({
    resolver: zodResolver(PersonalDataFormSchema),
    defaultValues: {
      address: defaultValues.address ?? undefined,
      dateOfBirth: defaultValues.dateOfBirth ? defaultValues?.dateOfBirth.slice(0, 10) : undefined,
      status: defaultValues.status ?? 'free',
      foreignLanguages: defaultForeignLanguages,
      technologies: defaultTechnologies,
      portfolioLinks: defaultValues.portfolioLinks ?? [],
      jobHistories: defaultJobHistories,
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mutationLoading) {
      return;
    }

    handleSubmit(
      async (data) => {
        handlePersonalDataPost(getPersonalDataInputForm(data));
      },
      (e) => {
        console.log(e);
      },
    )();
  };

  const { field } = useController({
    name: 'status',
    control,
  });

  return (
    <div className="container flex flex-col gap-5 rounded-b-xl p-8 md:px-12 lg:px-16">
      <div className="mb-4 flex items-center gap-2">
        <button onClick={() => navigate(-1)}>
          <IoMdArrowBack className="text-dark" size={24} />
        </button>
        <h3 className="text-2xl font-semibold text-dark">Fill up personal data</h3>
      </div>
      <form
        onSubmit={onSubmit}
        className="flex min-h-[500px] w-full flex-col items-center justify-between gap-5 bg-dark_blue px-10 py-5 sm:rounded-xl xl:w-auto xl:min-w-[800px]">
        <div className="mx-auto flex w-full flex-col gap-4">
          <FormFieldWrapper<IPersonalDataForm> field="address" error={errors.address} register={register} />
          <FormFieldWrapper<IPersonalDataForm>
            field="dateOfBirth"
            label="Date of birth"
            error={errors.dateOfBirth}
            register={register}
            type="date"
            min={MIN_DATE}
            max={MAX_DATE}
          />
          <FormToggleWrapper
            label="Status"
            isToggled={field.value === 'hired'}
            untoggledOption="Free"
            toggledOption="Hired"
            onChange={(value: boolean) => {
              field.onChange(value ? 'hired' : 'free');
            }}
          />
          <TechnologiesField control={control} />
          <ForeignLanguagesField control={control} />
          <PortfolioLinksField control={control} register={register} />
          <JobHistoryField control={control} register={register} />
        </div>
        {mutationLoading ? (
          <Spinner isLight />
        ) : (
          <Button type="submit" className="mx-auto" disabled={mutationLoading}>
            Submit
          </Button>
        )}
      </form>
    </div>
  );
};

export default PersonalDataForm;
