import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

const JobOfferApplicationsPage = () => {
  const { id } = useParams() as { id: string };

  const { data, isError, isLoading } = useQuery(['jobOfferApplications', id]);

  return <div>JobOfferApplicationsPage</div>;
};

export default JobOfferApplicationsPage;
