import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { getCandidateApplication } from '../../api/applications/userApplications';
import Spinner from '../../components/UI/Spinner/Spinner';
import { GetPathsLinks } from '../../constants/paths';

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
    <div className="container flex flex-1 flex-col gap-3 bg-light p-8">
      <h2 className="w-fit rounded-xl text-center text-title_bold text-dark">{data.jobOfferTitle}</h2>
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
