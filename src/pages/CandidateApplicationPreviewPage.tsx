import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { getCandidateApplication } from '../api/applications/userApplications';
import Spinner from '../components/UI/Spinner/Spinner';
import { GetPathsLinks } from '../constants/paths';

const CandidateApplicationPreviewPage = () => {
  const { id } = useParams() as { id: string };
  const { data, error, isLoading } = useQuery(['candidateApplication', id], () => getCandidateApplication(id));

  if (error) {
    return <div className="m-auto">An error ocurred</div>;
  }

  if (!data || isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex-1 container bg-light flex flex-col gap-3 p-8">
      <h2 className="text-center text-dark text-title_bold w-fit rounded-xl">{data.jobOfferTitle}</h2>
      <Link className="cursor-pointer hover:text-orange" to={GetPathsLinks.getJobOffersWithFilters(1)}>
        Company name here
      </Link>
      <p>{data.applicationId}</p>
      <p>{data.candidateEmail}</p>
      <p>{data.candidateName}</p>
      <p>{data.candidateSurname}</p>
      <p>{data.isAccepted}</p>
    </div>
  );
};

export default CandidateApplicationPreviewPage;
