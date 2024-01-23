import {
  endRecruitment,
  getRecruiterRecruitment,
  sendRecruitmentFeedback,
  startRecruitment,
} from '@/api/recruitments/recruitments';
import FeedbackModal from '@/components/PrepareRecruitmentContent/FeedbackModal';
import ManageTasksModal from '@/components/PrepareRecruitmentContent/ManageTasksModal';
import Button from '@/components/UI/Button';
import ConfirmModal from '@/components/UI/ConfirmModal/ConfirmModal';
import Spinner from '@/components/UI/Spinner/Spinner';
import { GetPathsLinks, Paths } from '@/constants/paths';
import { formatISODateToDDMMYYYYHHMM, getRecruitmentStateMessage } from '@/helpers';
import { IRecruitmentFeedback } from '@/types/recruitmentsTypes';
import { useState } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const RecruitmentPreviewRecruiter = () => {
  const { id } = useParams() as {
    id: string;
  };
  const navigate = useNavigate();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showManageTasksModal, setShowManageTasksModal] = useState(false);

  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery(`recruitment-${id}`, () => getRecruiterRecruitment(id));

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

  const handleSendFeedback = (data: IRecruitmentFeedback) => {
    sendFeedbackMutate({
      id: id,
      feedback: data.feedback,
    });
  };

  const handleStartRecruitment = () => {
    if (startRecruitmentLoading || data?.meetingLink) return;
    startRecruitmentMutate(id);
  };

  const handleEndRecruitment = () => {
    if (endRecruitmentLoading || !data?.meetingLink) return;
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
          <h2 className="text-xl font-semibold text-gray-700">
            {data.jobOfferTitle} at {data.companyName}
          </h2>
          <p className="text-base text-gray-700">
            Candidate: {data.candidateName} {data.candidateSurname}
          </p>
          <p className="text-base text-gray-700">
            Recruiter: {data.recruiterName} {data.recruiterSurname}
          </p>
          <p className="text-base text-gray-700">Date: {formatISODateToDDMMYYYYHHMM(data.date)}</p>
          <p className="text-base text-gray-700">
            Technical Date: {data.dateTechnical && formatISODateToDDMMYYYYHHMM(data.dateTechnical)}
          </p>
          <p className="text-base text-gray-700">Status: {getRecruitmentStateMessage(data.state)}</p>
          <Button className="w-fit rounded-md p-2 text-sm" onClick={() => setShowManageTasksModal(true)}>
            Manage tasks
          </Button>
          {showManageTasksModal && (
            <ManageTasksModal
              recruitmentId={data.id}
              handleCloseModal={() => setShowManageTasksModal(false)}
              defaultPracticalTasks={data.practicalTasks}
              defaultTheoreticalTasks={data.theoreticalTasks}
              isTasksEditable={data.state === 2 || data.state === 3}
            />
          )}
          <h3 className="text-dark">Practical Tasks</h3>
          <ul className="flex flex-col gap-2 text-sm text-dark">
            {data.practicalTasks?.map((task) => (
              <Link
                to={GetPathsLinks.getPracticalTaskSolve(task.id)}
                key={task.id}
                className="flex flex-col justify-between rounded-sm bg-dark/5 p-2 text-start shadow-md hover:bg-orange hover:text-light">
                <p>Question: {task.question}</p>
                <p>Difficulty Level: {task.difficultyLevel}</p>
                <p>Tag: {task.tag}</p>
              </Link>
            ))}
          </ul>
          {data.practicalTasks?.length === 0 && (
            <p className="text-sm font-light text-dark">No practicalTasks tasks selected</p>
          )}
          <h3 className="text-dark">Theoretical Tasks</h3>
          <ul className="flex flex-col gap-2 text-sm text-dark">
            {data.theoreticalTasks?.map((task) => (
              <Link
                to={GetPathsLinks.getTheoreticalTaskSolve(task.id)}
                key={task.id}
                className="flex flex-col justify-between rounded-sm bg-dark/5 p-2 text-start shadow-md hover:bg-orange hover:text-light">
                <p>Question: {task.question}</p>
                <p>Difficulty Level: {task.difficultyLevel}</p>
                <p>Tag: {task.tag}</p>
              </Link>
            ))}
          </ul>
          {data.theoreticalTasks?.length === 0 && (
            <p className="text-sm font-light text-dark">No theoretical tasks selected</p>
          )}

          <p className="my-2 text-sm text-dark">
            Recruitment Link :{' '}
            {data.meetingLink ? (
              <a className="text-orange underline">{data.meetingLink}</a>
            ) : (
              <span>This recruitment has not started yet</span>
            )}
          </p>
          {data.meetingLink ? (
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
