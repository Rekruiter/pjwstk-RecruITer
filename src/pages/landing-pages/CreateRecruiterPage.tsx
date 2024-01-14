import CreateRecruiterForm from '@/components/AuthForms/CreateRecruiterForm';
import AuthContext from '@/context/auth-context';
import { useContext, useEffect } from 'react';

const CreateRecruiterPage = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      logout();
    }
  }, [isLoggedIn, logout]);

  return (
    <div className="flex flex-1 flex-col p-6">
      <h2 className="text-4xl font-medium text-dark">Reset Your Password</h2>
      <CreateRecruiterForm />
    </div>
  );
};

export default CreateRecruiterPage;
