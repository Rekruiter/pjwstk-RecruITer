import { Paths } from '@/constants/paths';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const navigate = useNavigate();
  return (
    <div className="container flex flex-col gap-32 p-6">
      <h2 className="text-2xl font-bold text-dark">Settings</h2>
      <div className="flex flex-col gap-2">
        <button
          className="flex w-full border border-dark p-3 pl-5 text-xl text-dark hover:border-none hover:bg-orange hover:text-light"
          onClick={() => navigate(Paths.fillUpPersonalData.path)}>
          Personal Data
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
