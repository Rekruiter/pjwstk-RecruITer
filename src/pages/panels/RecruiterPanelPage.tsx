import { useContext } from 'react';
import AuthContext from '../../context/auth-context';
import { useQuery } from 'react-query';
import { getRecruiterPanelData } from '../../api/panels/recruiterPanel';
import Spinner from '../../components/UI/Spinner/Spinner';
import CompanyJobOffersSection from '../../components/RecruiterPanelContent/CompanyJobOffersSection';
import CompanyApplicationsSection from '../../components/RecruiterPanelContent/CompanyApplicationsSection';
import RecruitmentsPanelSection from '../../components/RecruiterPanelContent/RecruitmentsPanelSection';

const RecruiterPanelPage = () => {
  const { name } = useContext(AuthContext);
  const { data, isError, isLoading } = useQuery('recruiterPanel', getRecruiterPanelData);

  if (isError) return <div>An error occured...</div>;
  if (isLoading) return <Spinner />;
  if (!data) return null;

  return (
    <div className="container flex flex-grow flex-col gap-10 bg-light p-6">
      <h3 className="text-3xl text-dark">Hello {name}</h3>
      <div className="flex min-h-[50vh] flex-col gap-5 rounded-lg bg-light_blue p-5">
        <div className="w-full text-center text-2xl text-dark">{data.companyName} Panel</div>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <CompanyJobOffersSection jobOffers={data.jobOffers} />
          <CompanyApplicationsSection applications={data.applications} />
        </div>
        <RecruitmentsPanelSection recruitments={data.recruitments} />
      </div>
    </div>
  );
};

export default RecruiterPanelPage;
