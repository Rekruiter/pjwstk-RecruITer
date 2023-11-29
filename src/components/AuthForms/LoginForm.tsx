import Button from '../UI/Button';
import Spinner from '../UI/Spinner/Spinner';
import { useForm } from 'react-hook-form';
import { ILoginFormInput, LoginFormInputSchema } from '../../types/authFormTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { useContext, useState } from 'react';
import FormFieldWrapper from './FormHelpers/FormFieldWrapper';
import { AuthMethodType } from '../../helpers/getAuthMethod';
import { useMutation } from 'react-query';
import { loginPost } from '../../api/authorization/authorization';
import AuthContext from '../../context/auth-context';
import { useSearchParams } from 'react-router-dom';
import { IAuthorizationObject } from '../../types/authorizationTypes';

export interface LoginFormProps {
  changeAuthMethod: (method: AuthMethodType) => void;
}

const getMappedRole = (role: string): IAuthorizationObject['role'] => {
  switch (role) {
    case 'Basic user':
      return 'user';
  }
  return 'user';
};

const LoginForm = ({ changeAuthMethod }: LoginFormProps) => {
  const { login } = useContext(AuthContext);
  const [, setSearchParams] = useSearchParams();

  const { error, isLoading, mutate } = useMutation<IAuthorizationObject, Error, ILoginFormInput>('login', loginPost, {
    onSuccess(data) {
      login({
        name: data.name,
        token: data.token,
        role: getMappedRole(data.role),
      });
      setSearchParams((prevParams) => {
        prevParams.delete('authorization');
        return prevParams;
      });
    },
  });

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<ILoginFormInput>({
    resolver: zodResolver(LoginFormInputSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

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

  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center justify-between">
      <div className="flex w-5/6 flex-col gap-2">
        <FormFieldWrapper<ILoginFormInput>
          field="email"
          register={register}
          error={errors.email}
          autocomplete="username"
        />
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-light">Password</label>
          <div className="relative">
            <input
              {...register('password')}
              className={`h-10 w-full rounded border-2 py-2 pl-2 text-base ${
                errors.password ? 'border-error_color' : 'border-light'
              }`}
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
            />
            <button
              onClick={() => setShowPassword((prevState) => !prevState)}
              type="button"
              className="absolute bottom-0 right-0 flex aspect-square h-10 items-center justify-center rounded hover:border ">
              {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
            </button>
          </div>
          {errors.password && <div className="text-error_color">{errors.password.message}</div>}
          <div className="flex w-full justify-end">
            <button onClick={() => changeAuthMethod('reset-password')} type="button" className="text-sm text-light">
              Forgot password ?
            </button>
          </div>
        </div>
      </div>
      <div className="my-3 flex flex-row">
        {isLoading ? (
          <Spinner isLight />
        ) : (
          <Button className="min-w-authButton shadow-md" type="submit">
            Log in
          </Button>
        )}
      </div>
      {error && <div className="text-error_color">{error.message}</div>}
      <p className="text-sm text-light_blue">
        Don't have an account ?<span> </span>
        <button type="button" onClick={() => changeAuthMethod('register')} className="text-light">
          Sign up now
        </button>
      </p>
    </form>
  );
};

export default LoginForm;
