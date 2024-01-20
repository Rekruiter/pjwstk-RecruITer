import {
  endRecruitment,
  getRecruiterRecruitment,
  sendRecruitmentFeedback,
  startRecruitment,
} from '@/api/recruitments/recruitments';
import FeedbackModal from '@/components/PrepareRecruitmentContent/FeedbackModal';
import Button from '@/components/UI/Button';
import ConfirmModal from '@/components/UI/ConfirmModal/ConfirmModal';
import Spinner from '@/components/UI/Spinner/Spinner';
import { Paths } from '@/constants/paths';
import { IRecruitmentFeedback } from '@/types/recruitmentsTypes';
import { useState } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const RecruitmentPreviewRecruiter = () => {
  const { id } = useParams() as {
    id: string;
  };
  const navigate = useNavigate();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery(`recruitment-${id}`, () => getRecruiterRecruitment(id));

  console.log(data);
  const { mutate: endRecruitmentMutate, isLoading: endRecruitmentLoading } = useMutation(
    ['endRecruitment', id],
    endRecruitment,
    {
      onSuccess: () => {
        toast.success('Recruitment ended');
        setShowFeedbackModal(true);
      },
      onError: () => {
        toast.error('An error occured, please try again later');
      },
    },
  );

  const { mutate: startRecruitmentMutate, isLoading: startRecruitmentLoading } = useMutation(
    ['startRecruitment', id],
    startRecruitment,
    {
      onSuccess: () => {
        toast.success('Recruitment started');
        queryClient.refetchQueries(`recruitment-${id}`);
      },
      onError: () => {
        toast.error('An error occured, please try again later');
      },
    },
  );

  const { mutate: sendFeedbackMutate, isLoading: sendFeedbackLoading } = useMutation(
    ['sendRecruitmentFeedback', id],
    sendRecruitmentFeedback,
    {
      onSuccess: () => {
        toast.success('Feedback sent');
        navigate(Paths.home.path);
      },
      onError: () => {
        toast.error('Failed to send feedback');
      },
    },
  );

  const temporaryHasLink = true;

  const handleSendFeedback = (data: IRecruitmentFeedback) => {
    sendFeedbackMutate({
      id: id,
      feedback: data.feedback,
    });
  };

  const handleStartRecruitment = () => {
    if (startRecruitmentLoading || temporaryHasLink) return;
    startRecruitmentMutate(id);
  };

  const handleEndRecruitment = () => {
    if (endRecruitmentLoading || !temporaryHasLink) return;
    endRecruitmentMutate(id);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <p className="m-auto">An error occured, please try again later</p>;
  }

  return (
    <div className="container flex flex-col gap-5 rounded-b-xl p-8 md:px-12 lg:px-16">
      <div className="mb-4 flex items-center gap-2">
        <button onClick={() => navigate(-1)}>
          <IoMdArrowBack className="text-dark" size={24} />
        </button>
        <h3 className="text-2xl font-semibold text-dark">Recruitment preview</h3>
      </div>
      {data && (
        <div className="flex flex-col gap-2">
          <h2>
            {data.jobOfferTitle} at {data.companyName}
          </h2>
          <p>
            Candidate: {data.candidateName} {data.candidateSurname}
          </p>
          <p>
            Recruiter: {data.recruiterName} {data.recruiterSurname}
          </p>
          <p>Date: {new Date(data.date).toLocaleDateString()}</p>
          <p>Technical Date: {data.dateTechnical ? new Date(data.dateTechnical).toLocaleDateString() : ''}</p>
          <p>State: {data.state}</p>
          <h3>Recruitment Tasks</h3>
          <ul>
            {data.recruitmentTasks.map((task) => (
              <li key={task.idTask}>Task ID: {task.idTask}</li>
            ))}
          </ul>
          <h3>Practical Tasks</h3>
          <ul>
            {data.practicalTasks?.map((task) => (
              <li key={task.id}>
                <p>Question: {task.question}</p>
                <p>Difficulty Level: {task.difficultyLevel}</p>
                <p>Tag: {task.tag}</p>
                <p>Hint: {task.hint}</p>
              </li>
            ))}
          </ul>
          <h3>Theoretical Tasks</h3>
          <ul>
            {data.theoreticalTasks?.map((task) => (
              <li key={task.id}>
                <p>Question: {task.question}</p>
                <p>Difficulty Level: {task.difficultyLevel}</p>
                <p>Tag: {task.tag}</p>
                <p>Hint: {task.hint}</p>
              </li>
            ))}
          </ul>
          {temporaryHasLink ? (
            <Button className="w-fit" onClick={() => setShowConfirmModal(true)}>
              End recruitment
            </Button>
          ) : (
            <Button className="w-fit" onClick={handleStartRecruitment}>
              {startRecruitmentLoading ? <Spinner isLight className="h-6 w-6 border-4" /> : 'Start recruitment'}
            </Button>
          )}
          {showConfirmModal && (
            <ConfirmModal
              handleCloseModal={() => setShowConfirmModal(false)}
              title={`Are you sure you want to end recruitment?`}>
              <div className="mt-10 flex justify-center gap-5">
                <Button className="bg-success_color" disabled={endRecruitmentLoading} onClick={handleEndRecruitment}>
                  {endRecruitmentLoading ? <Spinner isLight className="h-6 w-6 border-4" /> : 'Confirm'}
                </Button>
                <Button className="bg-error_color" onClick={() => setShowConfirmModal(false)}>
                  Cancel
                </Button>
              </div>
            </ConfirmModal>
          )}
        </div>
      )}
      {showFeedbackModal && (
        <FeedbackModal
          isSendable={true}
          isLoading={sendFeedbackLoading}
          handleSendFeedback={handleSendFeedback}
          showSkipButton={() => {
            navigate(Paths.home.path);
          }}
        />
      )}
    </div>
  );
};

export default RecruitmentPreviewRecruiter;
