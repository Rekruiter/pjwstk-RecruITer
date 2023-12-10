import { useController, useForm } from 'react-hook-form';
import { IPersonalDataForm, PersonalDataFormSchema } from '../types/personalDataFormTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../components/UI/Button';
import FormFieldWrapper from '../components/FormHelpers/FormFieldWrapper';
import FormToggleWrapper from '../components/FormHelpers/FormToggleWrapper';
import TechnologiesField from '../components/FillPersonalDataForm/Technologies/TechnologiesField';
import ForeignLanguagesField from '../components/FillPersonalDataForm/ForeignLanguages/ForeignLanguagesField';
import PortfolioLinksField from '../components/FillPersonalDataForm/PortfolioLinks/PortfolioLinksField';
import JobHistoryField from '../components/FillPersonalDataForm/JobHistory/JobHistoryField';
import { MAX_DATE, MIN_DATE } from '../constants/dateInputValues';
import { getPersonalDataInputForm } from '../api/personalData/personalDataForm';

export const mocked_technologies: IPersonalDataForm['technologies'] = [
  {
    code: BigInt(1),
    name: 'C',
    isPicked: false,
  },
  {
    code: BigInt(2),
    name: 'Cpp',
    isPicked: false,
  },
  {
    code: BigInt(4),
    name: 'CSharp',
    isPicked: false,
  },
  {
    code: BigInt(8),
    name: 'Java',
    isPicked: false,
  },
  {
    code: BigInt(16),
    name: 'JavaScript',
    isPicked: false,
  },
];

export const mocked_languages: IPersonalDataForm['foreignLanguages'] = [
  {
    code: BigInt(1),
    name: 'English',
    isPicked: false,
  },
  {
    code: BigInt(2),
    name: 'German',
    isPicked: false,
  },
  {
    code: BigInt(4),
    name: 'French',
    isPicked: false,
  },
  {
    code: BigInt(8),
    name: 'Spanish',
    isPicked: false,
  },
  {
    code: BigInt(16),
    name: 'Russian',
    isPicked: false,
  },
];

const FillUpPersonalData = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IPersonalDataForm>({
    resolver: zodResolver(PersonalDataFormSchema),
    defaultValues: {
      status: 'free',
      technologies: mocked_technologies,
      foreignLanguages: mocked_languages,
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleSubmit(
      async (data) => {
        console.log(data);
        console.log(getPersonalDataInputForm(data));
        console.log(JSON.stringify(getPersonalDataInputForm(data)));
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

  const isHired = field.value === 'hired';

  return (
    <div className="container flex flex-col items-center gap-6 py-6 sm:p-6">
      <h2 className="text-4xl font-medium text-dark">Fill up personal data</h2>
      <form
        onSubmit={onSubmit}
        className="flex min-h-[500px] w-full flex-col items-center justify-between gap-5 bg-dark_blue px-10 py-5 sm:rounded-xl md:w-[540px] xl:w-[768px]">
        <div className="mx-auto flex w-full flex-col gap-2">
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
          <FormToggleWrapper<IPersonalDataForm, 'status'> field={field} isToggled={isHired} />
          <TechnologiesField control={control} />
          <ForeignLanguagesField control={control} />
          <PortfolioLinksField control={control} register={register} />
          <JobHistoryField control={control} register={register} />
        </div>
        <Button type="submit" className="mx-auto">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default FillUpPersonalData;
