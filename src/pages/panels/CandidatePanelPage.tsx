import { useContext } from 'react';
import AuthContext from '../../context/auth-context';
import ProposedJobOffersSection from '../../components/UserPanelContent/ProposedJobOffersSection';
import LastTasksSection from '../../components/UserPanelContent/LastTasksSection';
import CandidateUpcomingRecruitments from '../../components/UserPanelContent/CandidateUpcomingRecruitments';
import CandidateRecruitmentInvitations from '../../components/UserPanelContent/CandidateRecruitmentInvitations';
import { useQuery } from 'react-query';
import { getCandidatePanelData } from '../../api/panels/candidatePanel';
import Spinner from '@/components/UI/Spinner/Spinner';

const CandidatePanelPage = () => {
  const { data, isLoading, isError } = useQuery('candidatePanelData', getCandidatePanelData);
  const { name } = useContext(AuthContext);

  if (isLoading) return <Spinner />;
  if (isError || !data) return <p className="m-auto">Error, please try again later</p>;

  return (
    <div className="container flex flex-grow flex-col gap-10 bg-light p-6">
      <h3 className="text-3xl text-dark">Hello {name}</h3>
      <div className="flex min-h-[50vh] flex-col gap-5 rounded-lg bg-light_blue p-5 xl:px-12 xl:py-10">
        <div className="flex w-full flex-col gap-5 md:flex-row">
          {data.jobOffers && <ProposedJobOffersSection jobOffers={data.jobOffers} />}
          {data.lastTasks && <LastTasksSection tasks={data.lastTasks} />}
        </div>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <CandidateUpcomingRecruitments recruitments={data.upcomingRecruitments} />
          <CandidateRecruitmentInvitations recruitmentInvitations={data.recruitmentInvitations} />
        </div>
      </div>
    </div>
  );
};

export default CandidatePanelPage;
