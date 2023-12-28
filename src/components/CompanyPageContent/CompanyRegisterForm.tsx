import { useForm } from 'react-hook-form';
import FormFieldWrapper from '../FormHelpers/FormFieldWrapper';
import { IRegisterCompanyFormInput, RegisterCompanyFormInputSchema } from '@/types/authFormTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../UI/Button';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { registerCompanyPost } from '@/api/authorization/companyAuth';
import IError from '@/api/Error/Error';
import Spinner from '../UI/Spinner/Spinner';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface CompanyRegisterFormProps {
  handlePreviousSection: () => void;
}

const CompanyRegisterForm = ({ handlePreviousSection }: CompanyRegisterFormProps) => {
  const navigate = useNavigate();
  const [formStep, setFormStep] = useState<0 | 1 | 2>(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm<IRegisterCompanyFormInput>({
    resolver: zodResolver(RegisterCompanyFormInputSchema),
  });

  const { mutate, isLoading } = useMutation<any, IError, IRegisterCompanyFormInput>(
    'registerCompany',
    registerCompanyPost,
    {
      onSuccess() {
        toast.success('Account has been created successfully');
        navigate('/?authorization=login', { replace: true });
      },
      onError(error) {
        toast.error(error.message);
      },
    },
  );

  const handleContinue = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validation = await trigger(['companyAddress', 'city', 'nameCompany', 'nipNumber', 'zipCode']);

    if (!validation) {
      setFormStep(1);
      return;
    }
    setFormStep(2);
  };

  useEffect(() => {
    const subscribeCompany = watch(() => trigger(['companyAddress', 'city', 'nameCompany', 'nipNumber', 'zipCode']));
    if (formStep !== 1) {
      subscribeCompany.unsubscribe();
    }
    return () => subscribeCompany.unsubscribe();
  }, [watch, formStep, trigger]);

  const onSubmit = handleSubmit((data) => {
    if (isLoading) return;
    mutate(data);
  });

  return (
    <form
      className="flex min-h-full basis-full flex-col items-start justify-between gap-4 overflow-y-auto rounded-md bg-dark_blue p-5 text-light shadow-lg md:p-10 xl:basis-1/2"
      onSubmit={formStep === 2 ? onSubmit : handleContinue}>
      <button
        type="button"
        onClick={formStep === 2 ? () => setFormStep(0) : handlePreviousSection}
        className="underline underline-offset-4">
        Go back
      </button>
      <div className="flex w-full flex-col gap-2 text-dark">
        {formStep !== 2 ? (
          <>
            <FormFieldWrapper<IRegisterCompanyFormInput>
              field="nameCompany"
              error={errors.nameCompany}
              register={register}
              label="Company name"
              key="nameCompany"
            />
            <FormFieldWrapper<IRegisterCompanyFormInput>
              field="nipNumber"
              error={errors.nipNumber}
              register={register}
              label="NIP"
              key="nipNumber"
            />
            <FormFieldWrapper<IRegisterCompanyFormInput>
              field="companyAddress"
              error={errors.companyAddress}
              register={register}
              label="Adress"
              key="adress"
            />
            <FormFieldWrapper<IRegisterCompanyFormInput>
              field="city"
              error={errors.city}
              register={register}
              label="City"
              key="city"
            />
            <FormFieldWrapper<IRegisterCompanyFormInput>
              field="zipCode"
              error={errors.zipCode}
              register={register}
              label="Zip code"
              key="zipCode"
            />
          </>
        ) : (
          <>
            <FormFieldWrapper<IRegisterCompanyFormInput>
              field="name"
              register={register}
              error={errors.name}
              autocomplete="given-name"
              key="name"
            />
            <FormFieldWrapper<IRegisterCompanyFormInput>
              field="surname"
              register={register}
              error={errors.surname}
              autocomplete="family-name"
              key="surname"
            />
            <FormFieldWrapper<IRegisterCompanyFormInput>
              field="email"
              register={register}
              error={errors.email}
              autocomplete="username"
              key="email"
            />
            <FormFieldWrapper<IRegisterCompanyFormInput>
              field="phoneNumber"
              register={register}
              error={errors.phoneNumber}
              autocomplete="tel"
              key="phoneNumber"
            />
            <FormFieldWrapper<IRegisterCompanyFormInput>
              field="password"
              register={register}
              error={errors.password}
              type="password"
              autocomplete="new-password"
              key="password"
            />
            <FormFieldWrapper<IRegisterCompanyFormInput>
              field="confirmPassword"
              register={register}
              error={errors.confirmPassword}
              type="password"
              autocomplete="new-password"
              key="confirmPassword"
            />
          </>
        )}
      </div>
      {formStep === 2 ? (
        <Button className="place-self-end disabled:opacity-70" disabled={isLoading}>
          {isLoading ? <Spinner isLight className="h-6 w-6 border-2" /> : 'Register account'}
        </Button>
      ) : (
        <Button className="place-self-end">Continue</Button>
      )}
    </form>
  );
};

export default CompanyRegisterForm;
