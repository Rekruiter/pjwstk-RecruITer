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

const data: IAdminPanel = {
  companyName: 'Test Company',
  jobOffers: [
    {
      id: 1,
      applicationsCount: 10,
      location: 'Warsaw',
      title: 'Test Job Offer',
    },
    {
      id: 2,
      applicationsCount: 10,
      location: 'Remote',
      title: 'Test2 Job offer',
    },
  ],
  applications: [
    {
      id: 1,
      candidateName: 'Jan',
      candidateSurname: 'Kowalski',
      currency: 'PLN',
      expectedSalary: 10000,
      jobOfferTitle: 'Junior java developer',
    },
    {
      id: 2,
      candidateName: 'Michał',
      candidateSurname: 'Musiał',
      currency: 'PLN',
      expectedSalary: null,
      jobOfferTitle: 'Junior java developer',
    },
  ],
  recruitments: [
    {
      id: 1,
      candidateName: 'Jan',
      candidateSurname: 'Kowalski',
      date: '2011-10-05T14:48:00.000Z',
    },
    {
      id: 2,
      candidateName: 'Michał Musiał',
      candidateSurname: 'Kowalski',
      date: '2011-10-05T14:48:00.000Z',
    },
  ],
  recruiters: [
    {
      id: 1,
      email: 'email.com@p.pl.',
      currentApplicationsCount: 10,
      name: 'Jan',
      surname: 'Kowalski',
    },
  ],
};

const AdminPanelPage = () => {
  const { name } = useContext(AuthContext);
  // const { data, isError, isLoading } = useQuery('adminPanel', getAdminPanelData);

  // if (isError) return <div>An error occured...</div>;
  // if (isLoading) return <Spinner />;
  // if (!data) return null;

  return (
    <div className="container flex flex-grow flex-col gap-10 bg-light p-6">
      <h3 className="text-3xl text-dark">Hello {name}</h3>
      <div className="flex min-h-[50vh] flex-col gap-5 rounded-lg bg-light_blue p-5 xl:px-12 xl:py-10">
        <div className="w-full text-center text-2xl text-dark">{data.companyName} Panel</div>
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
