import { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth-context';
import ResetPasswordForm from '../../components/AuthForms/ResetPasswordForm';

const ResetPasswordConfirmPage = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      logout();
    }
  }, [isLoggedIn, logout]);

  return (
    <div className="flex flex-1 flex-col p-6">
      <h2 className="text-4xl font-medium text-dark">Reset Your Password</h2>
      <ResetPasswordForm />
    </div>
  );
};

export default ResetPasswordConfirmPage;
