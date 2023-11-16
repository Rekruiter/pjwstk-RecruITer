import { useForm } from 'react-hook-form';
import { IRegisterFormInput, RegisterFormInputSchema } from '../../types/authFormTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../UI/Button';
import Spinner from '../UI/Spinner/Spinner';
import FormFieldWrapper from './FormHelpers/FormFieldWrapper';
import { AuthMethodType } from '../../helpers/getAuthMethod';

interface RegisterFormsProps {
  changeAuthMethod: (method: AuthMethodType) => void;
}

const RegisterForm = ({ changeAuthMethod }: RegisterFormsProps) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<IRegisterFormInput>({
    resolver: zodResolver(RegisterFormInputSchema),
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
      <div className="flex flex-col gap-2 w-2/3">
        <FormFieldWrapper<IRegisterFormInput> field="name" register={register} error={errors.name} />
        <FormFieldWrapper<IRegisterFormInput> field="surname" register={register} error={errors.surname} />
        <FormFieldWrapper<IRegisterFormInput> field="email" register={register} error={errors.email} />
        <FormFieldWrapper<IRegisterFormInput>
          field="phoneNumber"
          register={register}
          error={errors.phoneNumber}
          type="number"
        />
        <FormFieldWrapper<IRegisterFormInput>
          field="password"
          register={register}
          error={errors.password}
          type="password"
        />
        <FormFieldWrapper<IRegisterFormInput>
          field="confirmPassword"
          register={register}
          error={errors.confirmPassword}
          type="password"
        />
      </div>
      <div className="flex flex-row my-3">
        <Button className="shadow-md min-w-authButton" type="submit" disabled={isLoading}>
          {isLoading ? <Spinner isLight /> : 'Sign up'}
        </Button>
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
