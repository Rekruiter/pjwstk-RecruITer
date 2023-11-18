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
import { ITemporaryAuthorizationObject } from '../../types/authorizationTypes';

export interface LoginFormProps {
  changeAuthMethod: (method: AuthMethodType) => void;
}

const LoginForm = ({ changeAuthMethod }: LoginFormProps) => {
  const { login } = useContext(AuthContext);

  const { error, isLoading, mutate } = useMutation<ITemporaryAuthorizationObject, Error, ILoginFormInput>(
    'login',
    loginPost,
    {
      onSuccess(data) {
        login({
          name: data.name,
          token: data.token,
          role: 'user',
        });
      },
    },
  );

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
      <div className="flex flex-col gap-2 w-5/6">
        <FormFieldWrapper<ILoginFormInput>
          field="email"
          register={register}
          error={errors.email}
          autocomplete="username"
        />
        <div className="flex flex-col gap-2">
          <label className="text-light font-semibold">Password</label>
          <div className="relative">
            <input
              {...register('password')}
              className={`w-full rounded py-2 pl-2 text-base h-10 border-2 ${
                errors.password ? 'border-error_color' : 'border-light'
              }`}
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
            />
            <button
              onClick={() => setShowPassword((prevState) => !prevState)}
              type="button"
              className="absolute right-0 bottom-0 h-10 aspect-square flex items-center justify-center hover:border rounded ">
              {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
            </button>
          </div>
          {errors.password && <div className="text-error_color">{errors.password.message}</div>}
          <div className="w-full flex justify-end">
            <button onClick={() => changeAuthMethod('reset-password')} type="button" className="text-light text-sm">
              Forgot password ?
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-row my-3">
        {isLoading ? (
          <Spinner isLight />
        ) : (
          <Button className="shadow-md min-w-authButton" type="submit">
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
