import { getRecruiterRecruitment } from '@/api/recruitments/recruitments';
import InviteCandidateModal from '@/components/PrepareRecruitmentContent/InviteCandidateModal';
import ManageTasksModal from '@/components/PrepareRecruitmentContent/ManageTasksModal';
import Button from '@/components/UI/Button';
import Spinner from '@/components/UI/Spinner/Spinner';
import { GetPathsLinks } from '@/constants/paths';
import { formatISODateToDDMMYYYYHHMM } from '@/helpers';
import { useState } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { useQuery } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MdOutlinePreview } from 'react-icons/md';

const getRecruitmentStateMessage = (recruitmentState: number) => {
  switch (recruitmentState) {
    case 1:
      return 'Preparation';
    case 2:
      return 'Invitation sent';
    case 3:
      return 'Invitation accepted';
    case 4:
      return 'Invitation rejected';
    case 5:
      return 'Finished';
  }
};

const PrepareRecruitmentPage = () => {
  const { id } = useParams() as { id: string };

  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const [showManageTasksModal, setShowManageTasksModal] = useState(false);

  const { data, isLoading, isError } = useQuery(`recruitment-${id}`, () => getRecruiterRecruitment(id));

  const navigate = useNavigate();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <p className="m-auto">An error occured, please try again later</p>;
  }

  if (!data) {
    return null;
  }
  //TODO: Add navigation to recruitment page.
  return (
    <div className="container flex flex-col gap-5 rounded-b-xl p-8 md:px-12 lg:px-16">
      <div className="mb-4 flex items-center gap-2">
        <button onClick={() => navigate(-1)}>
          <IoMdArrowBack className="text-dark" size={24} />
        </button>
        <h3 className="text-2xl font-semibold text-dark">Prepare recruitment</h3>
      </div>
      <div className="text-md flex flex-col gap-2 text-dark">
        <p>Job offer: {data.jobOfferTitle}</p>
        <Link className="text-orange underline" to={GetPathsLinks.getRecruiterApplicationPreview(data.applicationId)}>
          Check application
        </Link>
        <p>Recruitment started: {formatISODateToDDMMYYYYHHMM(data.date)}</p>
        <p>
          Candidate: {data.candidateName} {data.candidateSurname}
        </p>
        <p>
          Recruiter: {data.recruiterName} {data.recruiterSurname}
        </p>
        <p>Status: {getRecruitmentStateMessage(data.state)}</p>
        {data.dateTechnical && <p>Technical Interview Date: {formatISODateToDDMMYYYYHHMM(data.dateTechnical)}</p>}
        {(data.state === 2 || data.state === 3) && (
          <Button className="w-fit p-2 text-sm" onClick={() => setShowManageTasksModal(true)}>
            Manage tasks
          </Button>
        )}
        {showManageTasksModal && (
          <ManageTasksModal
            recruitmentId={data.id}
            handleCloseModal={() => setShowManageTasksModal(false)}
            defaultPracticalTasks={data.practicalTasks}
            defaultTheoreticalTasks={data.theoreticalTasks}
            isTasksEditable={data.state === 2 || data.state === 3}
          />
        )}
        <p>Practical tasks: </p>
        {data.practicalTasks?.map((task) => (
          <div key={task.id} className="flex justify-between bg-dark/5 p-2 shadow-md">
            <div className="flex flex-col">
              <p>
                <span className="font-medium">Question: </span>
                {task.question}
              </p>
              <p>{task.companyId === null ? 'Public task' : 'Company task'}</p>
            </div>
            <Link to={GetPathsLinks.getPracticalTaskSolve(task.id)} className="flex items-center">
              <MdOutlinePreview size={24} />
            </Link>
          </div>
        ))}
        <p>Theoreitcal tasks: </p>
        {data.theoreticalTasks?.map((task) => (
          <div key={task.id} className="flex justify-between bg-dark/5 p-2 shadow-md">
            <div className="flex flex-col">
              <p>
                <span className="font-medium">Question: </span>
                {task.question}
              </p>
              <p>{task.companyId === null ? 'Public task' : 'Company task'}</p>
            </div>
            <Link to={GetPathsLinks.getTheoreticalTaskSolve(task.id)} className="flex items-center">
              <MdOutlinePreview size={24} />
            </Link>
          </div>
        ))}
        {data.state !== 5 && (
          <Button onClick={() => setShowInvitationModal(true)}>
            {data.state === 1 ? 'Invite candidate' : 'Reinvite candidate'}
          </Button>
        )}
        {showInvitationModal && (
          <InviteCandidateModal
            recruitmentId={data.id}
            handleCloseModal={() => setShowInvitationModal(false)}
            isInvitable={data.state !== 5}
          />
        )}
        {data.state === 5 && <Button>Send feedback</Button>}
        {/* TODO: Add send feedback button with mutation */}
      </div>
    </div>
  );
};

export default PrepareRecruitmentPage;
