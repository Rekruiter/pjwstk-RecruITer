import { Paths } from '@/constants/paths';
import { Link } from 'react-router-dom';

const ProfileSettingsPage = () => {
  return (
    <div className="container flex flex-col gap-24 p-6">
      <h2 className="text-2xl font-bold text-dark">Profile settings</h2>
      <div className="flex flex-col gap-3">
        <Link
          to={Paths.fillUpPersonalData.path}
          className="flex w-full rounded-md bg-dark/10 p-3 pl-5 text-xl text-dark shadow-md hover:border-none hover:bg-orange hover:text-light">
          Personal Data
        </Link>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
