import { useNavigate } from 'react-router-dom';
import { IRecruiterPanel } from '../../types/panelPageTypes';
import PanelSectionWrapper from '../UI/PanelSectionWrapper';
import { Paths } from '../../constants/paths';

interface CompanyApplicationsSectionProps {
  applications: IRecruiterPanel['applications'];
}

const CompanyApplicationsSection = ({ applications }: CompanyApplicationsSectionProps) => {
  const navigate = useNavigate();

  return (
    <PanelSectionWrapper
      headerClickHandler={() => {
        navigate(Paths.jobOffers.path);
      }}
      headerTitle="Applications">
      {applications.map((application) => (
        <div
          key={application.id}
          className="flex w-full cursor-pointer flex-wrap border p-2 text-light hover:bg-orange"
          onClick={() => {
            // navigate to applicatoin
          }}>
          <div className="basis-full">
            <p className="line-clamp-1 overflow-hidden">
              <span className="font-medium">
                {application.candidateName} {application.candidateSurname}
              </span>{' '}
              applied for:
            </p>
          </div>
          <p className="basis-full font-semibold">Junior Java developer with analytic skills</p>
          {application.expectedSalary && (
            <p className="md:text-cener">
              His exptected salary is{' '}
              <span className="font-medium">
                {application.expectedSalary} {application.currency}
              </span>
            </p>
          )}
        </div>
      ))}
    </PanelSectionWrapper>
  );
};

export default CompanyApplicationsSection;
