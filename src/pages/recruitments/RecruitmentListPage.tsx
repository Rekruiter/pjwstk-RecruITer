import { getRecruiterRecruitmentList } from '@/api/recruitments/recruitments';
import RecruitmentListContent from '@/components/RecruitmentListContent/RecruitmentListContent';
import Spinner from '@/components/UI/Spinner/Spinner';
import { useQuery } from 'react-query';

const RecruitmentListPage = () => {
  const { data, isLoading, isError } = useQuery('recruitments', getRecruiterRecruitmentList);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <p className="m-auto">An error occured, please try again later</p>;
  }

  return (
    <div className="container flex flex-col gap-5 rounded-b-xl p-8 md:px-12 lg:px-16">
      <h3 className="text-2xl font-semibold text-dark">Company recruitments</h3>
      {data && <RecruitmentListContent recruitments={data} />}
    </div>
  );
};

export default RecruitmentListPage;
