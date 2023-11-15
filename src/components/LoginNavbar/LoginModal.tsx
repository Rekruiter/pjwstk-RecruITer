import React from 'react';
import Modal from '../UI/Modal/Modal';
import ExitIcon from '../../assets/exit_icon.svg';
import Button from '../UI/Button';
import Spinner from '../UI/Spinner/Spinner';
import { useForm } from 'react-hook-form';
import { ILoginForm, LoginFormSchema } from '../../types/authFormTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { Link } from 'react-router-dom';

interface LoginModalInterface {
  handleCloseModal: () => void;
  isHiding: boolean;
  handleLogin: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isLoading: boolean;
}

const LoginModal = ({ handleCloseModal, isHiding, handleLogin, isLoading }: LoginModalInterface) => {
  const { control, getValues, setValue, formState, register, handleSubmit } = useForm<ILoginForm>({
    resolver: zodResolver(LoginFormSchema),
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(
      async (data) => {
        console.log(data);
      },
      (e) => {
        console.log(e);
      },
    )();
  };

  const { errors } = formState;

  return (
    <Modal onClose={handleCloseModal} hiding={isHiding}>
      <div className="flex-grow rounded-xl bg-dark_blue p-4 grid">
        <div className="w-full text-end ">
          <button onClick={handleCloseModal}>
            <img src={ExitIcon} alt="X" className="max-h-full" />
          </button>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col items-center justify-between">
          <div className="flex flex-col gap-2 w-5/6">
            <div className="w-full flex flex-col gap-2">
              <label className="text-light_blue font-semibold">Email</label>
              <input
                {...register('email')}
                className={`w-full rounded py-2 pl-2 text-base h-10 border-2 ${
                  errors.email ? 'border-error_color' : 'border-light'
                }`}
                type="email"
              />
              {errors.email && <div className="text-error_color">{errors.email.message}</div>}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-light_blue font-semibold">Password</label>
              <div className="relative">
                <input
                  {...register('password')}
                  className={`w-full rounded py-2 pl-2 text-base h-10 border-2 ${
                    errors.password ? 'border-error_color' : 'border-light'
                  }`}
                  type={showPassword ? 'text' : 'password'}
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
                <Link to={'/'} className="text-light text-sm">
                  Forgot password ?
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <Button className="shadow-md min-w-loginButton" type="submit" disabled={isLoading}>
              {isLoading ? <Spinner /> : 'Log in'}
            </Button>
          </div>
          <p className="text-sm text-light_blue">
            Don't have an account ?<span> </span>
            <Link to={'/'} className="text-light">
              Sign up now
            </Link>
          </p>
        </form>
      </div>
    </Modal>
  );
};

export default LoginModal;
