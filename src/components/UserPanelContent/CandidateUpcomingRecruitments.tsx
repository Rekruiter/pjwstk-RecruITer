import { formatISODateToDDMMYYYYHHMM } from '../../helpers';
import { ICandidatePanel } from '../../types/panelPageTypes';
import PanelSectionWrapper from '../UI/PanelSectionWrapper';

interface CandidateUpcomingRecruitmentsProps {
  recruitments: ICandidatePanel['recruitmentInvitations'];
}

const CandidateUpcomingRecruitments = ({ recruitments }: CandidateUpcomingRecruitmentsProps) => {
  return (
    <PanelSectionWrapper headerClickHandler={() => {}} headerTitle="Upcoming Recruitments" className="sm:basis-3/5">
      {recruitments.map((recruitment) => (
        <div
          key={recruitment.id}
          className="flex w-full cursor-pointer flex-wrap border p-2 text-light hover:bg-orange"
          onClick={() => {
            // navigate to recruitment
          }}>
          <div className="basis-full">
            <p className="line-clamp-1 overflow-hidden font-medium">{recruitment.jobTitle}</p>
          </div>
          <p className="basis-full font-semibold">{recruitment.companyName}</p>
          <p className="md:text-cener">{formatISODateToDDMMYYYYHHMM(recruitment.date)}</p>
        </div>
      ))}
    </PanelSectionWrapper>
  );
};

export default CandidateUpcomingRecruitments;
