import PanelSectionWrapper from '../UI/PanelSectionWrapper';
import { ICandidatePanel } from '../../types/panelPageTypes';
import { formatISODateToDDMMYYYYHHMM } from '../../helpers';

interface CandidateRecruitmentInvitationsProps {
  recruitmentInvitations: ICandidatePanel['upcomingRecruitments'];
}

const CandidateRecruitmentInvitations = ({ recruitmentInvitations }: CandidateRecruitmentInvitationsProps) => {
  return (
    <PanelSectionWrapper headerClickHandler={() => {}} headerTitle="Upcoming Recruitments" className="sm:basis-2/5">
      {recruitmentInvitations.map((recruitment) => (
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

export default CandidateRecruitmentInvitations;
