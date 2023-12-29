import { Paths } from '@/constants/paths';
import AuthContext from '@/context/auth-context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileSettingsPage = () => {
  const navigate = useNavigate();
  const { role } = useContext(AuthContext);
  return (
    <div className="container flex flex-col gap-32 p-6">
      <h2 className="text-2xl font-bold text-dark">Profile settings</h2>
      {(role === 'user' || role === 'candidate') && (
        <button
          className="flex w-full border border-dark p-3 pl-5 text-xl text-dark hover:border-none hover:bg-orange hover:text-light"
          onClick={() => navigate(Paths.fillUpPersonalData.path)}>
          Personal Data
        </button>
      )}
    </div>
  );
};

export default ProfileSettingsPage;
