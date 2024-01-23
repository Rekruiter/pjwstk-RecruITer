import { Paths } from '@/constants/paths';
import AuthContext from '@/context/auth-context';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const CompanySettingsPage = () => {
  const { role } = useContext(AuthContext);

  return (
    <div className="container flex flex-col gap-24 p-6">
      <h2 className="text-2xl font-bold text-dark">Company settings</h2>
      <div className="flex flex-col gap-3">
        <Link
          to={Paths.manageCompanyTasks.path}
          className="flex w-full rounded-md bg-dark/10 p-3 pl-5 text-xl text-dark shadow-md hover:border-none hover:bg-orange hover:text-light">
          Manage company tasks
        </Link>
        <Link
          to={Paths.companyJobOffers.path}
          className="flex w-full rounded-md bg-dark/10 p-3 pl-5 text-xl text-dark shadow-md hover:border-none hover:bg-orange hover:text-light">
          Manage job offers
        </Link>
        {role === 'admin' && (
          <>
            <Link
              to={Paths.recruiters.path}
              className="flex w-full rounded-md bg-dark/10 p-3 pl-5 text-xl text-dark shadow-md hover:border-none hover:bg-orange hover:text-light">
              Manage recruiters
            </Link>
            <Link
              to={Paths.companyStatistics.path}
              className="flex w-full rounded-md bg-dark/10 p-3 pl-5 text-xl text-dark shadow-md hover:border-none hover:bg-orange hover:text-light">
              Check company logs
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default CompanySettingsPage;
