import { useContext, useEffect } from 'react';
import AuthContext from '../context/auth-context';
import ResetPasswordForm from '../components/AuthForms/ResetPasswordForm';

const ResetPasswordConfirmPage = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      logout();
    }
  }, [isLoggedIn, logout]);

  return (
    <div className="flex-1 p-6 flex flex-col">
      <h2 className="text-4xl text-dark font-medium">Reset Your Password</h2>
      <ResetPasswordForm />
    </div>
  );
};

export default ResetPasswordConfirmPage;
