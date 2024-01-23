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
    <div className="container flex flex-col gap-8 p-6">
      <h2 className="text-2xl font-bold text-dark">Welcome {name}</h2>
      <div className="flex min-h-[50vh] flex-col gap-3 rounded-lg bg-light_blue p-5 xl:px-12 xl:py-10">
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <ProposedJobOffersSection jobOffers={data.jobOffers} />
          <LastTasksSection
            lastPracticalTasks={data.lastPracticalTasks}
            lastTheoreticalTasks={data.lastTheoreticalTasks}
          />
        </div>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <CandidateRecruitmentInvitations recruitmentInvitations={data.recruitmentInvitations} />
          <CandidateUpcomingRecruitments recruitments={data.upcomingRecruitments} />
        </div>
      </div>
    </div>
  );
};

export default CandidatePanelPage;
