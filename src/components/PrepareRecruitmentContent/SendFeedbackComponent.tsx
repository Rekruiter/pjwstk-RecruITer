import { useState } from 'react';
import Button from '../UI/Button';
import { useMutation, useQueryClient } from 'react-query';
import { sendRecruitmentFeedback } from '@/api/recruitments/recruitments';
import { toast } from 'react-toastify';
import { IRecruitmentFeedback } from '@/types/recruitmentsTypes';
import FeedbackModal from './FeedbackModal';

interface SendFeedbackComponentProps {
  recruitmentId: string;
  isFeedbackSent: boolean | null;
}

const SendFeedbackComponent = ({ recruitmentId, isFeedbackSent }: SendFeedbackComponentProps) => {
  const [showSendFeedbackModal, setShowSendFeedbackModal] = useState(false);

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(['sendRecruitmentFeedback', recruitmentId], sendRecruitmentFeedback, {
    onSuccess: () => {
      toast.success('Feedback sent');
      setShowSendFeedbackModal(false);
      queryClient.refetchQueries(`recruitment-${recruitmentId}`);
    },
    onError: () => {
      toast.error('Failed to send feedback');
    },
  });

  const handleSendFeedback = (data: IRecruitmentFeedback) => {
    mutate({
      id: recruitmentId,
      feedback: data.feedback,
    });
  };

  return (
    <>
      <Button
        type="button"
        onClick={isFeedbackSent ? () => {} : () => setShowSendFeedbackModal(true)}
        disabled={!!isFeedbackSent}>
        {isFeedbackSent ? 'Feedback was already sent' : 'Send feedback'}
      </Button>
      {showSendFeedbackModal && (
        <FeedbackModal
          handleCloseModal={() => setShowSendFeedbackModal(false)}
          handleSendFeedback={handleSendFeedback}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default SendFeedbackComponent;
