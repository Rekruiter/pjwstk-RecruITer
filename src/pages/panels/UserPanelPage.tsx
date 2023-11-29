import { useContext } from 'react';
import AuthContext from '../../context/auth-context';
import { IUserPanel } from '../../types/panelPageTypes';
import { useNavigate } from 'react-router-dom';

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
  ],
  lastTasks: [
    {
      id: 1,
      compilationLanguage: 'Java',
      difficultyLevel: 1,
      question: 'What is the difference between an interface and an abstract class?',
    },
  ],
};
const UserPanelPage = () => {
  const { name } = useContext(AuthContext);

  const navigate = useNavigate();

  const data = mockedData2;

  return (
    <div className="flex-grow bg-light flex flex-col p-6 gap-10">
      <h3 className="text-3xl text-dark">Hello {name}</h3>
      <div className="min-h-[50vh] h-full bg-light_blue rounded-lg p-5 flex flex-col">
        {!data.isVerified && (
          <div className="mx-auto flex flex-col">
            <h4 className="text-error_color text-xl font-semibold">Your account is not verified</h4>
            <p className="text-dark">Please check your email box</p>
          </div>
        )}
        <div className="w-full flex flex-row">
          <div className="sm:basis-1/2 flex flex-col gap-2 border border-light rounded-lg bg-dark_blue p-3">
            <h5 className="text-light text-lg font-semibold mx-auto">Job offers</h5>
            {data.jobOffers?.map((jobOffer) => (
              <div
                className="w-full border p-2 flex flex-wrap text-light hover:bg-orange cursor-pointer"
                onClick={() => {
                  navigate('/job-offers/6');
                }}>
                <div className="basis-full md:basis-1/2">
                  <p className="break-all line-clamp-1 overflow-hidden">{jobOffer.title}</p>
                </div>
                <p className="basis-1/3 md:basis-1/4 md:text-center">{jobOffer.location}</p>
                <p className="basis-full sm:basis-1/3 md:basis-1/4 md:text-cener">
                  {jobOffer.minSalary}
                  {jobOffer.maxSalary !== null && `-${jobOffer.maxSalary}`} {jobOffer.currency}
                </p>
                <p className="basis-1/3 md:basis-full text-sm">{jobOffer.companyName}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPanelPage;
