import { useNavigate } from 'react-router-dom';
import { IAdminPanel } from '../../types/panelPageTypes';
import PanelSectionWrapper from '../UI/PanelSectionWrapper';
import { Paths } from '@/constants/paths';

interface CompanyRecruitersSectionProps {
  recruiters: IAdminPanel['recruiters'];
}

const CompanyRecruitersSection = ({ recruiters }: CompanyRecruitersSectionProps) => {
  const navigate = useNavigate();
  return (
    <PanelSectionWrapper headerTitle="Your recruiters" headerClickHandler={() => navigate(Paths.recruiters.path)}>
      {recruiters.map((recruiter) => (
        <div
          key={recruiter.id}
          className="flex w-full flex-wrap rounded-md bg-light/5 p-2 text-light shadow-md hover:bg-orange">
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
