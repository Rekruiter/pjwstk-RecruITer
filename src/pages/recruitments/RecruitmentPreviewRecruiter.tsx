import { getRecruiterRecruitment } from '@/api/recruitments/recruitments';
import Spinner from '@/components/UI/Spinner/Spinner';
import { IoMdArrowBack } from 'react-icons/io';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

const RecruitmentPreviewRecruiter = () => {
  const { id } = useParams() as {
    id: string;
  };
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery(`recruitment-${id}`, () => getRecruiterRecruitment(id));

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
          {/* TODO: if data has meeting link add button end recruitment. */}
        </div>
      )}
    </div>
  );
};

export default RecruitmentPreviewRecruiter;
