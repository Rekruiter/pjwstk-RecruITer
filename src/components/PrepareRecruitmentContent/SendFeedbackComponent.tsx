import { useState } from 'react';
import Button from '../UI/Button';
import { useMutation, useQueryClient } from 'react-query';
import { sendRecruitmentFeedback } from '@/api/recruitments/recruitments';
import { toast } from 'react-toastify';
import { IRecruitmentFeedback } from '@/types/recruitmentsTypes';
import FeedbackModal from './FeedbackModal';

interface SendFeedbackComponentProps {
  isSendable: boolean;
  recruitmentId: string;
}

const SendFeedbackComponent = ({ isSendable, recruitmentId }: SendFeedbackComponentProps) => {
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
      <Button type="button" onClick={() => setShowSendFeedbackModal(true)}>
        Send feedback
      </Button>
      {showSendFeedbackModal && (
        <FeedbackModal
          handleCloseModal={() => setShowSendFeedbackModal(false)}
          isSendable={isSendable}
          handleSendFeedback={handleSendFeedback}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default SendFeedbackComponent;
