import { useQuery } from 'react-query';
import AuthContext from '../../context/auth-context';
import { getAdminPanelData } from '../../api/panels/adminPanel';
import Spinner from '../../components/UI/Spinner/Spinner';
import CompanyJobOffersSection from '../../components/CompanyPanelsContent/CompanyJobOffersSection';
import CompanyApplicationsSection from '../../components/CompanyPanelsContent/CompanyApplicationsSection';
import RecruitmentsPanelSection from '../../components/CompanyPanelsContent/RecruitmentsPanelSection';
import { useContext } from 'react';
import { IAdminPanel } from '../../types/panelPageTypes';
import CompanyRecruitersSection from '../../components/CompanyPanelsContent/CompanyRecruitersSection';
import IError from '../../api/Error/Error';

const AdminPanelPage = () => {
  const { name } = useContext(AuthContext);
  const { data, isError, isLoading } = useQuery<IAdminPanel, IError>('adminPanel', getAdminPanelData, {
    onError: (err) => {
      console.log(err.errors);
      console.log(err.message);
      console.log(err.status);
    },
  });

  if (isError) return <p className="m-auto">An error occured...</p>;
  if (isLoading) return <Spinner />;
  if (!data) return null;

  return (
    <div className="container flex flex-grow flex-col gap-10 bg-light p-6">
      <h3 className="text-3xl text-dark">Welcome {name}</h3>
      <div className="flex min-h-[50vh] flex-col gap-5 rounded-lg bg-light_blue p-5 xl:p-10">
        <div className="w-full text-2xl text-dark">{data.companyName}</div>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <CompanyJobOffersSection jobOffers={data.jobOffers} />
          <CompanyApplicationsSection applications={data.applications} />
        </div>
        <div className="flex w-full flex-col gap-5 md:flex-row"></div>
        <RecruitmentsPanelSection recruitments={data.recruitments} />
        <CompanyRecruitersSection recruiters={data.recruiters} />
      </div>
    </div>
  );
};

export default AdminPanelPage;
