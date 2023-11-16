import React from 'react';
import { useForm } from 'react-hook-form';
import { IResetPasswordFormInput, ResetPasswordFormInputSchema } from '../../types/authFormTypes';
import FormFieldWrapper from './FormHelpers/FormFieldWrapper';
import Button from '../UI/Button';
import Spinner from '../UI/Spinner/Spinner';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthMethodType } from '../../helpers/getAuthMethod';

interface ForgotPasswordFormProps {
  changeAuthMethod: (method: AuthMethodType) => void;
}

const ForgotPasswordForm = ({ changeAuthMethod }: ForgotPasswordFormProps) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<IResetPasswordFormInput>({
    resolver: zodResolver(ResetPasswordFormInputSchema),
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(
      async (data) => {},
      (e) => {
        console.log(e);
      },
    )();
  };

  const isLoading = false;

  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center justify-between">
      <div className="flex flex-col gap-2 w-5/6">
        <FormFieldWrapper<IResetPasswordFormInput> field="email" register={register} error={errors.email} />
      </div>
      <div className="flex flex-row my-3">
        <Button className="shadow-md min-w-authButton" type="submit" disabled={isLoading}>
          {isLoading ? <Spinner isLight /> : 'Reset password'}
        </Button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
