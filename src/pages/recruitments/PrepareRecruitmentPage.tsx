import { getRecruiterRecruitment } from '@/api/recruitments/recruitments';
import InviteCandidateModal from '@/components/PrepareRecruitmentContent/InviteCandidateModal';
import Button from '@/components/UI/Button';
import Spinner from '@/components/UI/Spinner/Spinner';
import { useState } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

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
  // const [showManageTasksModal, setShowManageTasksModal] = useState(false);

  const { data, isLoading, isError } = useQuery(['recruitment', id], () => getRecruiterRecruitment(id));

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
        <p>
          Candidate: {data.candidateName} {data.candidateSurname}
        </p>
        <p>
          Recruiter: {data.recruiterName} {data.recruiterSurname}
        </p>
        <p>Status: {getRecruitmentStateMessage(data.state)}</p>
        {/* <Button className="w-fit p-2 text-sm" onClick={() => setShowManageTasksModal(true)}>
          Manage tasks
        </Button> */}
        <p>Practical tasks: </p>
        <p>Theoreitcal tasks: </p>
        {data.state !== 5 && (
          <Button onClick={() => setShowInvitationModal(true)}>
            {data.state === 1 ? 'Invite candidate' : 'Reinvite candidate'}
          </Button>
        )}
        {showInvitationModal && (
          <InviteCandidateModal recruitmentId={data.id} handleCloseModal={() => setShowInvitationModal(false)} />
        )}
      </div>
    </div>
  );
};

export default PrepareRecruitmentPage;
