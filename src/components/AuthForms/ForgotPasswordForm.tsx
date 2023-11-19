import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IResetPasswordFormInput, ResetPasswordFormInputSchema } from '../../types/authFormTypes';
import FormFieldWrapper from './FormHelpers/FormFieldWrapper';
import Button from '../UI/Button';
import Spinner from '../UI/Spinner/Spinner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'react-query';
import { resetPasswordPost } from '../../api/authorization/authorization';

type EmailSentProps =
  | {
      type: 'succes';
      email: string;
    }
  | {
      type: 'error';
      message: string;
    };

const ForgotPasswordForm = () => {
  const [isEmailSent, setIsEmailSent] = useState<EmailSentProps>();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<IResetPasswordFormInput>({
    resolver: zodResolver(ResetPasswordFormInputSchema),
  });

  const { mutate, isLoading } = useMutation('forgotPassword', resetPasswordPost, {
    onSuccess(_, variables) {
      setIsEmailSent({
        type: 'succes',
        email: variables.email,
      });
    },
    onError() {
      // TODO: Replace with real error
      setIsEmailSent({
        type: 'error',
        message: 'Erorr message',
      });
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    handleSubmit(
      async (data) => {
        mutate(data);
      },
      (e) => {
        console.log(e);
      },
    )();
  };

  if (isEmailSent) {
    return isEmailSent.type === 'succes' ? (
      <div className="flex flex-col text-light items-center gap-1">
        <h3 className="text-lg font-semibold">Check your email {isEmailSent.email}</h3>
        <p>We have sent you an email with a link to reset your password.</p>
      </div>
    ) : (
      <div className="flex flex-col text-error_color items-center gap-1">
        <h3 className="text-lg font-semibold">An error ocurred while trying to reset your password</h3>
        <p>{isEmailSent.message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center justify-between">
      <div className="flex flex-col gap-2 w-5/6">
        <FormFieldWrapper<IResetPasswordFormInput>
          field="email"
          register={register}
          error={errors.email}
          autocomplete="username"
        />
      </div>
      <div className="flex flex-row my-3">
        {isLoading ? (
          <Spinner isLight />
        ) : (
          <Button className="shadow-md min-w-authButton" type="submit">
            Reset password
          </Button>
        )}
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
