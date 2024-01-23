import { useContext } from 'react';
import AuthContext from '../../context/auth-context';
import NotVerifiedStatement from '../../components/UserPanelContent/NotVerifiedStatement';
import ProposedJobOffersSection from '../../components/UserPanelContent/ProposedJobOffersSection';
import LastTasksSection from '../../components/UserPanelContent/LastTasksSection';
import { useQuery } from 'react-query';
import { getUserPanelData } from '@/api/panels/userPanel';
import Spinner from '@/components/UI/Spinner/Spinner';

const UserPanelPage = () => {
  const { data, isLoading, isError } = useQuery('userPanelData', getUserPanelData);
  const { name } = useContext(AuthContext);

  if (isLoading) return <Spinner />;
  if (isError || !data) return <p className="m-auto">Error, please try again later</p>;

  if (!data.isVerified) {
    return <NotVerifiedStatement />;
  }

  return (
    <div className="container flex flex-col gap-8 p-6">
      <h2 className="text-2xl font-bold text-dark">Welcome {name}</h2>
      <div className="flex min-h-[50vh] flex-col gap-3 rounded-lg bg-light_blue p-5 xl:px-12 xl:py-10">
        <div className="flex w-full flex-col gap-5 md:flex-row">
          {data.jobOffers && <ProposedJobOffersSection jobOffers={data.jobOffers} />}
          {data.practicalTasks && data.theoreticalTasks && (
            <LastTasksSection lastPracticalTasks={data.practicalTasks} lastTheoreticalTasks={data.theoreticalTasks} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPanelPage;
