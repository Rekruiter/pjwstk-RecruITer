import { useForm } from 'react-hook-form';
import { IRegisterFormInput, RegisterFormInputSchema } from '../../types/authFormTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../UI/Button';
import Spinner from '../UI/Spinner/Spinner';
import FormFieldWrapper from '../FormHelpers/FormFieldWrapper';
import { AuthMethodType } from '../../helpers/getAuthMethod';
import { useMutation } from 'react-query';
import { registerPost } from '../../api/authorization/authorization';
import { useState } from 'react';
import IError from '../../api/Error/Error';

interface RegisterFormsProps {
  changeAuthMethod: (method: AuthMethodType) => void;
}

const RegisterForm = ({ changeAuthMethod }: RegisterFormsProps) => {
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const { mutate, error, isLoading } = useMutation<any, IError, IRegisterFormInput>('register', registerPost, {
    onSuccess() {
      setIsUserRegistered(true);
    },
  });

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<IRegisterFormInput>({
    resolver: zodResolver(RegisterFormInputSchema),
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

  if (isUserRegistered) {
    return (
      <div className="flex flex-col items-center gap-1 text-success_color">
        <h3 className="text-lg font-semibold">Welcome to RecruITer society</h3>
        <p>We have sent you an email with a link to verify your account</p>
        <Button onClick={() => changeAuthMethod('login')} className="mt-10">
          Navigate to login section
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center justify-between py-6">
      <div className="flex w-2/3 flex-col gap-2 py-10">
        <FormFieldWrapper<IRegisterFormInput>
          field="name"
          register={register}
          error={errors.name}
          autocomplete="given-name"
        />
        <FormFieldWrapper<IRegisterFormInput>
          field="surname"
          register={register}
          error={errors.surname}
          autocomplete="family-name"
        />
        <FormFieldWrapper<IRegisterFormInput>
          field="email"
          register={register}
          error={errors.email}
          autocomplete="username"
        />
        <FormFieldWrapper<IRegisterFormInput>
          label="Phone number"
          field="phoneNumber"
          register={register}
          error={errors.phoneNumber}
          autocomplete="tel"
        />
        <FormFieldWrapper<IRegisterFormInput>
          field="password"
          register={register}
          error={errors.password}
          type="password"
          autocomplete="new-password"
        />
        <FormFieldWrapper<IRegisterFormInput>
          field="confirmPassword"
          label="Confirm password"
          register={register}
          error={errors.confirmPassword}
          type="password"
          autocomplete="new-password"
        />
      </div>
      {error && (
        <>
          <p className="my-2 font-semibold text-error_color">
            {error.message} {error.errors.length != 0 && ': '}
          </p>
          {error.errors.map((err) => (
            <p className=" text-error_color">{err}</p>
          ))}
        </>
      )}
      <div className="my-3 flex flex-row">
        {isLoading ? (
          <Spinner isLight />
        ) : (
          <Button className="min-w-authButton shadow-md" type="submit">
            Sign up
          </Button>
        )}
      </div>
      <p className="text-sm text-light_blue">
        You have an account ?<span> </span>
        <button type="button" onClick={() => changeAuthMethod('login')} className="text-light">
          Sign in now
        </button>
      </p>
    </form>
  );
};

export default RegisterForm;
