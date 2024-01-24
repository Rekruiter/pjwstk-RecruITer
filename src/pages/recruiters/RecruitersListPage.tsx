import { getRecruiters } from '@/api/recruiters/recruiters';
import RecruiterListItem from '@/components/RecruitersListContent/RecruiterListItem';
import Spinner from '@/components/UI/Spinner/Spinner';
import { defaultStyles } from '@/constants/defaultStyles';
import { Paths } from '@/constants/paths';
import { cn } from '@/lib/utils';
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
      <div className="mt-3 flex flex-col gap-3">
        {data?.map((recruiter) => <RecruiterListItem key={recruiter.id} recruiter={recruiter} />)}
      </div>
    </div>
  );
};

export default RecruitersListPage;
