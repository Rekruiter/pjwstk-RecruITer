import { Paths } from '@/constants/paths';
import { Link } from 'react-router-dom';

const CompanySettingsPage = () => {
  return (
    <div className="container flex flex-col gap-24 p-6">
      <h2 className="text-2xl font-bold text-dark">Company settings</h2>
      <div className="flex flex-col gap-3">
        <Link
          to={Paths.manageCompanyTasks.path}
          className="flex w-full rounded-md bg-dark/10 p-3 pl-5 text-xl text-dark shadow-md hover:border-none hover:bg-orange hover:text-light"
          onClick={() => {}}>
          Manage company tasks
        </Link>
        <Link
          to={Paths.companyJobOffers.path}
          className="flex w-full rounded-md bg-dark/10 p-3 pl-5 text-xl text-dark shadow-md hover:border-none hover:bg-orange hover:text-light"
          onClick={() => {}}>
          Manage job offers
        </Link>
        <Link
          to={Paths.recruiters.path}
          className="flex w-full rounded-md bg-dark/10 p-3 pl-5 text-xl text-dark shadow-md hover:border-none hover:bg-orange hover:text-light"
          onClick={() => {}}>
          Manage recruiters
        </Link>
      </div>
    </div>
  );
};

export default CompanySettingsPage;
