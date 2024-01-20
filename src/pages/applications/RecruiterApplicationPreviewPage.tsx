import { acceptOrRejectApplication, getRecruiterApplication } from '@/api/applications/applications';
import Button from '@/components/UI/Button';
import ConfirmModal from '@/components/UI/ConfirmModal/ConfirmModal';
import Spinner from '@/components/UI/Spinner/Spinner';
import { GetPathsLinks, Paths } from '@/constants/paths';
import { getStatusMessage } from '@/helpers';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { IoMdArrowBack } from 'react-icons/io';
import { useMutation, useQuery } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const calculateAge = (dateOfBirth: string) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) age--;
  return age;
};

const RecruiterApplicationPreviewPage = () => {
  const [showConfirmModal, setShowConfirmModal] = useState<'accept' | 'reject' | null>(null);
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery(['recruiterApplication', id], () => getRecruiterApplication(id), {
    cacheTime: 1,
  });
  const { mutate, isLoading: mutationLoading } = useMutation('acceptOrRejectApplication', acceptOrRejectApplication, {
    onSuccess(_, variables) {
      toast.success(`Application ${variables.isAccepted ? 'accepted' : 'rejected'} successfully`);
      navigate(Paths.recruiterApplications.path);
    },
    onError: () => {
      //TODO: Handle error messages later
      toast.error('An error ocurred');
      setShowConfirmModal(null);
    },
  });

  if (error) {
    return <div className="m-auto">An error ocurred</div>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (!data) {
    return <div className="m-auto">Application not found</div>;
  }

  const handleAcceptOrReject = () => {
    if (!showConfirmModal || mutationLoading || data.status !== null) {
      return;
    }
    mutate({
      id: id,
      isAccepted: showConfirmModal === 'accept' ? true : false,
    });
  };

  return (
    <div className="container flex flex-1 flex-col gap-3 bg-light p-8">
      <div className="mb-4 flex items-center gap-2">
        <button onClick={() => navigate(-1)}>
          <IoMdArrowBack className="text-dark" size={24} />
        </button>
        <h3 className="text-2xl font-semibold text-dark">Application preview</h3>
      </div>
      <p className="text-sm text-dark">
        Current status: <span className="font-semibold">{getStatusMessage(data.status)}</span>
      </p>
      <div className="flex flex-wrap gap-y-10 text-dark">
        <div className="flex basis-full flex-col gap-5 p-2 md:basis-1/2">
          <h4 className="rounded-sm bg-dark/5 p-2 text-center text-lg shadow-md">Job offer info</h4>
          <Link className="text-xl hover:text-orange" to={GetPathsLinks.getJobOfferPreview(data.jobOfferId)}>
            {data.jobOfferTitle}
          </Link>
          <div className="flex flex-wrap gap-2">
            {data.jobOfferTechnologies.map((tech, idx) => (
              <div key={idx} className="flex items-center gap-2 border border-dark p-1">
                <p>{tech.technologyName}</p>
                <div className="inline-flex text-orange">
                  {Array(tech.level)
                    .fill(0)
                    .map((_, idx) => (
                      <FaStar key={idx} />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex basis-full flex-col gap-5 p-2 text-dark md:basis-1/2">
          <h4 className="rounded-sm bg-dark/5 p-2 text-center text-lg shadow-md">Candidate info</h4>
          <div className="flex flex-col gap-1">
            <p className="text-md">
              {data.candidateName} {data.candidateSurname}
            </p>
            <p className="text-md">{data.candidateEmail}</p>
            <p className="text-md">{data.phoneNumber}</p>
            <p className="text-md">{new Date(data.dateOfBirth).toLocaleDateString()}</p>
            <p className="text-md">{calculateAge(data.dateOfBirth)} Years Old</p>
            <div className="text-md flex gap-5">
              <p>Foreign languages:</p>
              <div className="flex flex-wrap gap-2">
                {data.foreignLanguages.map((language, idx) => (
                  <p key={idx}>{language}</p>
                ))}
              </div>
            </div>
            <div className="text-md flex gap-5">
              <p>Known technologies</p>
              <div className="flex flex-wrap gap-2">
                {data.technologies.map((tech, idx) => (
                  <p key={idx}>{tech}</p>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p>Portfolio links:</p>
              {data.portfolioLinks.map((link) => (
                <div key={link.id} className="flex flex-col gap-1">
                  <p>{link.name}</p>
                  <a href={link.linkUrl} className="hover:text-orange hover:underline">
                    {link.linkUrl}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex basis-full flex-col gap-5 p-2">
          <h4 className="rounded-sm bg-dark/5 p-2 text-center text-lg shadow-md">Application info</h4>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <p className="basis-1/3">Introduce yourself: </p>
              <p className="min-h-[45px] w-full break-words rounded-md bg-dark/5 p-2 text-sm">{data.introduction}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="basis-1/3">Question answers: </p>
              <div className="flex flex-col gap-2">
                {data.answers.map((answer, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <p className="font-medium">{answer.question}</p>
                    <p className="font-normal">{answer.answerToQuestion}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {data.status === null && (
        <div className="flex justify-center gap-10">
          <Button className="bg-success_color" onClick={() => setShowConfirmModal('accept')}>
            Accept
          </Button>
          <Button className="bg-red-600" onClick={() => setShowConfirmModal('reject')}>
            Reject
          </Button>
        </div>
      )}
      {showConfirmModal && (
        <ConfirmModal
          handleCloseModal={() => setShowConfirmModal(null)}
          title={`Are you sure you want to ${showConfirmModal} candidate?`}>
          <div className="mt-10 flex justify-center gap-5">
            <Button className="bg-success_color" disabled={mutationLoading} onClick={handleAcceptOrReject}>
              {mutationLoading ? <Spinner isLight className="h-6 w-6 border-4" /> : 'Confirm'}
            </Button>
          </div>
        </ConfirmModal>
      )}
    </div>
  );
};

export default RecruiterApplicationPreviewPage;
