import { getRecruiters } from '@/api/recruiters/recruiters';
import Spinner from '@/components/UI/Spinner/Spinner';
import { defaultStyles } from '@/constants/defaultStyles';
import { GetPathsLinks, Paths } from '@/constants/paths';
import { cn } from '@/lib/utils';
import { CiEdit } from 'react-icons/ci';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

const RecruitersListPage = () => {
  const { data, isLoading, isError } = useQuery('recruiters', getRecruiters);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <p className="m-auto">An error occured, please try again later</p>;
  }

  return (
    <div className="container flex flex-col gap-5 p-6">
      <h2 className="text-2xl font-bold text-dark">Company Recruiters</h2>
      <Link to={Paths.addRecruiter.path} className={cn(defaultStyles.orangeButton, 'w-fit')}>
        Add new recruiter
      </Link>
      <div className="flex flex-col gap-3">
        {data?.map((recruiter) => (
          <div
            key={recruiter.id}
            className="flex w-full justify-between rounded-md bg-dark/10 p-3 pl-5 text-xl text-dark shadow-md hover:border-none hover:bg-orange hover:text-light">
            <div className="flex flex-col gap-2">
              <p>
                {recruiter.name} {recruiter.surname}
              </p>
              <p>{recruiter.email}</p>
            </div>
            <Link to={GetPathsLinks.getEditRecruiter(recruiter.id)} className="flex items-center hover:scale-110">
              <CiEdit size={32} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecruitersListPage;
