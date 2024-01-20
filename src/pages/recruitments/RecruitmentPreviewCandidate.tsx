import { getRecruitmentPreviewCandidate } from '@/api/recruitments/recruitmentPreviews';
import { getRecruitmentLink } from '@/api/recruitments/recruitments';
import Spinner from '@/components/UI/Spinner/Spinner';
import { useEffect } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

const RecruitmentPreviewCandidate = () => {
  const { id } = useParams() as {
    id: string;
  };
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery(`recruitmentPreviewCandidate-${id}`, () =>
    getRecruitmentPreviewCandidate(id),
  );

  const {
    data: meetingLink,
    isError: meetingLinkError,
    refetch,
  } = useQuery(`meetingLink-${id}`, () => getRecruitmentLink(id));

  useEffect(() => {
    if (!data || !data.dateTechnical || meetingLink) return;

    const dateTechnical = data.dateTechnical;
    if (!dateTechnical) return;

    const intervalId = setInterval(() => {
      if (
        Date.now() > new Date(dateTechnical).getTime() - 30 * 60 * 1000 &&
        Date.now() < new Date(dateTechnical).getTime() + 120 * 60 * 1000
      ) {
        refetch();
      }
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, [data, meetingLink, refetch]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || meetingLinkError) {
    return <p className="m-auto">An error occured, please try again later</p>;
  }

  if (!data) {
    return;
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
          <h2 className="text-2xl font-bold text-blue-600">
            {data.jobOfferTitle} at {data.companyName}
          </h2>
          <p className="text-lg text-gray-700">ID: {data.id}</p>
          <p className="text-lg text-gray-700">Application ID: {data.applicationId}</p>
          <p className="text-lg text-gray-700">Date: {new Date(data.date).toLocaleDateString()}</p>
          <p className="text-lg text-gray-700">
            Technical Date: {data.dateTechnical ? new Date(data.dateTechnical).toLocaleDateString() : ''}
          </p>
          <p className="text-lg text-gray-700">
            Recruiter: {data.recruiterName} {data.recruiterSurname}
          </p>
        </div>
      )}
    </div>
  );
};

export default RecruitmentPreviewCandidate;
