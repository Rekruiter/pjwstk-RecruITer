import { useQuery } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getCandidateApplication } from '../../api/applications/applications';
import Spinner from '../../components/UI/Spinner/Spinner';
import { GetPathsLinks } from '../../constants/paths';
import { IoMdArrowBack } from 'react-icons/io';
import { getStatusMessage } from '@/helpers';

const CandidateApplicationPreviewPage = () => {
  const { id } = useParams() as { id: string };
  const { data, error, isLoading } = useQuery(['candidateApplication', id], () => getCandidateApplication(id));

  const navigate = useNavigate();

  if (error) {
    return <div className="m-auto">An error ocurred</div>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (!data) {
    return <div className="m-auto">Application not found</div>;
  }

  return (
    <div className="container flex flex-1 flex-col gap-3 bg-light p-8">
      <div className="mb-4 flex items-center gap-2">
        <button onClick={() => navigate(-1)}>
          <IoMdArrowBack className="text-dark" size={24} />
        </button>
        <h3 className="text-2xl font-semibold text-dark">Application preview</h3>
      </div>
      <div className="flex flex-col gap-2 text-dark">
        <Link
          className="cursor-pointer text-2xl font-medium hover:text-orange"
          to={GetPathsLinks.getJobOfferPreview(data.jobOfferId)}>
          {data.jobOfferTitle}
        </Link>
        <Link className="cursor-pointer text-lg hover:text-orange" to={GetPathsLinks.getJobOffersWithFilters(1)}>
          {data.companyName}
        </Link>
        <p className="text-sm">
          Current status: <span className="font-semibold">{getStatusMessage(data.status)}</span>
        </p>
      </div>
    </div>
  );
};

export default CandidateApplicationPreviewPage;
