import { useForm } from 'react-hook-form';
import { IResetPasswordConfirmFormInput, ResetPasswordConfirmFormInputSchema } from '../../types/authFormTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import FormFieldWrapper from '../FormHelpers/FormFieldWrapper';
import Button from '../UI/Button';
import { useMutation } from 'react-query';
import { resetPasswordConfirmPost } from '../../api/authorization/authorization';
import Spinner from '../UI/Spinner/Spinner';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPasswordForm = () => {
  const { token } = useParams() as { token: string };

  const { mutate, error, isLoading, isSuccess } = useMutation<any, Error, IResetPasswordConfirmFormInput>(
    'resetPassword',
    (input: IResetPasswordConfirmFormInput) => resetPasswordConfirmPost(input, token),
  );

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IResetPasswordConfirmFormInput>({
    resolver: zodResolver(ResetPasswordConfirmFormInputSchema),
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

  if (isSuccess) {
    return (
      <div className="m-auto flex flex-col items-center gap-1 text-dark">
        <h3 className="text-lg font-semibold text-success_color">Your password has been reset successfully</h3>
        <Button
          onClick={() =>
            navigate('/?authorization=login', {
              replace: true,
            })
          }
          className="mt-2">
          Navigate to login section
        </Button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="m-auto flex flex-col items-center gap-1 text-dark">
        <h3 className="text-lg font-semibold text-error_color">Oh no !</h3>
        <p>{error.message}</p>
        <p>In order to try again: </p>
        <Button
          onClick={() =>
            navigate('/?authorization=login', {
              replace: true,
            })
          }
          className="mt-2">
          Navigate to reset password section
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="m-auto flex flex-col gap-2 rounded-xl bg-dark/80 px-10 py-20 shadow-md md:min-w-[32rem]">
      <FormFieldWrapper<IResetPasswordConfirmFormInput>
        field="newPassword"
        register={register}
        error={errors.newPassword}
        autocomplete="new-password"
        type="password"
      />
      <FormFieldWrapper<IResetPasswordConfirmFormInput>
        field="confirmNewPassword"
        register={register}
        error={errors.confirmNewPassword}
        autocomplete="new-password"
        type="password"
      />
      {isLoading ? (
        <Spinner isLight />
      ) : (
        <Button type="submit" className="mt-5">
          Reset Password
        </Button>
      )}
    </form>
  );
};

export default ResetPasswordForm;
