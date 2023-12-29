import { IAdminPanel } from '../../types/panelPageTypes';
import PanelSectionWrapper from '../UI/PanelSectionWrapper';

interface CompanyRecruitersSectionProps {
  recruiters: IAdminPanel['recruiters'];
}

const CompanyRecruitersSection = ({ recruiters }: CompanyRecruitersSectionProps) => {
  return (
    <PanelSectionWrapper
      headerTitle="Your recruiters"
      headerClickHandler={() => {
        //navigate to all recruiters
      }}>
      {recruiters.map((recruiter) => (
        <div
          key={recruiter.id}
          className="flex w-full cursor-pointer flex-wrap rounded-md bg-light/5 p-2 text-light shadow-md hover:bg-orange"
          onClick={() => {
            //navigate to edit recruiter page
          }}>
          <div className="basis-full">
            <p className="line-clamp-1 overflow-hidden font-medium">
              {recruiter.name} {recruiter.surname}
            </p>
          </div>
          <p className="md:text-cener">{recruiter.email}</p>
        </div>
      ))}
    </PanelSectionWrapper>
  );
};

export default CompanyRecruitersSection;
