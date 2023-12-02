import { useContext } from 'react';
import AuthContext from '../../context/auth-context';
import { IUserPanel } from '../../types/panelPageTypes';
import NotVerifiedStatement from '../../components/UserPanelContent/NotVerifiedStatement';
import ProposedJobOffersSection from '../../components/UserPanelContent/ProposedJobOffersSection';
import LastTasksSection from '../../components/UserPanelContent/LastTasksSection';

const mockedData: IUserPanel = {
  isVerified: false,
  jobOffers: null,
  lastTasks: null,
};

const mockedData2: IUserPanel = {
  isVerified: true,
  jobOffers: [
    {
      id: 1,
      companyName: 'Google',
      currency: 'PLN',
      minSalary: 10000,
      maxSalary: 20000,
      location: 'Warsaw',
      title: 'Junior Java Developer dosiadjajidiodioasdiodaijodajidjiasodjs',
    },
    {
      id: 2,
      companyName: 'Google',
      currency: 'PLN',
      minSalary: 10000,
      maxSalary: 20000,
      location: 'Warsaw',
      title: 'Junior Java Developer dosiadjajidiodioasdiodaijodajidjiasodjs',
    },
    {
      id: 3,
      companyName: 'Google',
      currency: 'PLN',
      minSalary: 10000,
      maxSalary: 20000,
      location: 'Warsaw',
      title: 'Junior Java Developer dosiadjajidiodioasdiodaijodajidjiasodjs',
    },
    {
      id: 4,
      companyName: 'Google',
      currency: 'PLN',
      minSalary: 10000,
      maxSalary: 20000,
      location: 'Warsaw',
      title: 'Junior Java Developer dosiadjajidiodioasdiodaijodajidjiasodjs',
    },
    {
      id: 5,
      companyName: 'Google',
      currency: 'PLN',
      minSalary: 10000,
      maxSalary: 20000,
      location: 'Warsaw',
      title: 'Junior Java Developer dosiadjajidiodioasdiodaijodajidjiasodjs',
    },
  ],
  lastTasks: [
    {
      id: 1,
      compilationLanguage: 'Java',
      difficultyLevel: 1,
      question: 'What is the difference between an interface and an abstract class?',
    },
    {
      id: 2,
      compilationLanguage: 'Java',
      difficultyLevel: 1,
      question: 'What is the difference between an interface and an abstract class?',
    },
    {
      id: 3,
      compilationLanguage: 'Java',
      difficultyLevel: 1,
      question: 'What is the difference between an interface and an abstract class?',
    },
    {
      id: 4,
      compilationLanguage: 'Java',
      difficultyLevel: 1,
      question: 'What is the difference between an interface and an abstract class?',
    },
    {
      id: 5,
      compilationLanguage: 'Java',
      difficultyLevel: 1,
      question: 'What is the difference between an interface and an abstract class?',
    },
  ],
};

const UserPanelPage = () => {
  const { name } = useContext(AuthContext);

  const data = mockedData2;

  if (!data.isVerified) {
    return <NotVerifiedStatement />;
  }

  return (
    <div className="container flex flex-grow flex-col gap-10 bg-light p-6">
      <h3 className="text-3xl text-dark">Hello {name}</h3>
      <div className="flex min-h-[50vh] flex-col gap-5 rounded-lg bg-light_blue p-5 xl:px-12 xl:py-10">
        <div className="flex w-full flex-col gap-5 md:flex-row">
          {data.jobOffers && <ProposedJobOffersSection jobOffers={data.jobOffers} />}
          {data.lastTasks && <LastTasksSection tasks={data.lastTasks} />}
        </div>
      </div>
    </div>
  );
};

export default UserPanelPage;
