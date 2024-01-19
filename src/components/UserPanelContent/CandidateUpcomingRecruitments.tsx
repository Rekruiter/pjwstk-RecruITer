import { Link } from 'react-router-dom';
import { formatISODateToDDMMYYYYHHMM } from '../../helpers';
import { ICandidatePanel } from '../../types/panelPageTypes';
import PanelSectionWrapper from '../UI/PanelSectionWrapper';
import { GetPathsLinks, Paths } from '@/constants/paths';

interface CandidateUpcomingRecruitmentsProps {
  recruitments: ICandidatePanel['upcomingRecruitments'];
}

const CandidateUpcomingRecruitments = ({ recruitments }: CandidateUpcomingRecruitmentsProps) => {
  return (
    <PanelSectionWrapper headerTitle="Upcoming recruitments" className="sm:basis-3/5">
      {recruitments.length === 0 && (
        <p className="m-auto text-light">
          Navigate to{' '}
          <Link to={Paths.candidateApplications.path} className="text-orange underline underline-offset-2">
            Application
          </Link>{' '}
          section to see your applications status
        </p>
      )}
      {recruitments.map((recruitment) => (
        <Link
          to={GetPathsLinks.getRecruitmentPreviewCandidate(recruitment.id)}
          key={recruitment.id}
          className="flex w-full flex-wrap border p-2 text-light hover:bg-orange">
          <div className="basis-3/4">
            <p className="line-clamp-1 overflow-hidden font-medium">{recruitment.jobTitle}</p>
            <p className="font-semibold">{recruitment.companyName}</p>
            <p>{formatISODateToDDMMYYYYHHMM(recruitment.date)}</p>
          </div>{' '}
        </Link>
      ))}
    </PanelSectionWrapper>
  );
};

export default CandidateUpcomingRecruitments;
