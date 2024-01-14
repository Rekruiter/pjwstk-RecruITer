import PanelSectionWrapper from '../UI/PanelSectionWrapper';
import { ICandidatePanel } from '../../types/panelPageTypes';
import { formatISODateToDDMMYYYYHHMM } from '../../helpers';
import { useMutation, useQueryClient } from 'react-query';
import { acceptOrRejectRecruitment } from '@/api/recruitments/recruitments';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Paths } from '@/constants/paths';
import Spinner from '../UI/Spinner/Spinner';
import Button from '../UI/Button';

interface CandidateRecruitmentInvitationsProps {
  recruitmentInvitations: ICandidatePanel['recruitmentInvitations'];
}

const CandidateRecruitmentInvitations = ({ recruitmentInvitations }: CandidateRecruitmentInvitationsProps) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, variables } = useMutation('acceptRecruitmentInvitation', acceptOrRejectRecruitment, {
    onSuccess(_, variables) {
      toast.success(`Invitation sucessfully ${variables.isAccepted ? 'accepted' : 'rejected'}`);
      queryClient.refetchQueries('candidatePanelData');
    },
    onError: () => {
      toast.error('Something went wrong, please try again later');
    },
  });

  const handleAcceptOrRejectRecruitment = (recruitmentId: number, isAccepted: boolean) => {
    if (isLoading) return;
    mutate({ id: recruitmentId, isAccepted });
  };

  return (
    <PanelSectionWrapper headerTitle="Recruitment invitations" className="sm:basis-3/5">
      {recruitmentInvitations.length === 0 && (
        <p className="m-auto text-light">
          Navigate to{' '}
          <Link to={Paths.candidateApplications.path} className="text-orange underline underline-offset-2">
            Application
          </Link>{' '}
          section to see your applications status
        </p>
      )}
      {recruitmentInvitations.map((recruitment) => (
        <div key={recruitment.id} className="flex w-full flex-wrap border p-2 text-light hover:bg-orange">
          <div className="basis-3/4">
            <p className="line-clamp-1 overflow-hidden font-medium">{recruitment.jobTitle}</p>
            <p className="font-semibold">{recruitment.companyName}</p>
            <p>{formatISODateToDDMMYYYYHHMM(recruitment.date)}</p>
          </div>
          {isLoading}
          {isLoading && variables?.id === recruitment.id ? (
            <Spinner isLight />
          ) : (
            <div className="flex items-center gap-2">
              <Button
                className="h-fit bg-success_color px-2 py-1 hover:scale-105 disabled:opacity-80 disabled:hover:scale-100"
                disabled={isLoading}
                onClick={() => handleAcceptOrRejectRecruitment(recruitment.id, true)}>
                Accept
              </Button>
              <Button
                className="h-fit bg-red-600 px-2 py-1 hover:scale-105 disabled:opacity-80"
                disabled={isLoading}
                onClick={() => handleAcceptOrRejectRecruitment(recruitment.id, false)}>
                Reject
              </Button>
            </div>
          )}
        </div>
      ))}
    </PanelSectionWrapper>
  );
};

export default CandidateRecruitmentInvitations;
