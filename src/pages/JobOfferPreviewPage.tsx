import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { JobOffer, fetchJobOffer } from '../api/jobOffers/jobOffers';
import Spinner from '../components/UI/Spinner/Spinner';
import Button from '../components/UI/Button';

const JobOfferPreviewPage = () => {
  const { id } = useParams() as { id: string };

  const { data, error, isLoading } = useQuery<JobOffer, Error>(['jobOffer', id], () => fetchJobOffer(id), {});

  if (error) {
    return <div className="m-auto">Error {error?.message}</div>;
  }

  if (!data || isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex-1 container bg-light flex flex-col gap-3 p-8">
      <h2 className="text-center text-dark text-title_bold w-fit rounded-xl">{data.title}</h2>
      <Link className="cursor-pointer hover:text-orange" to={`/job-offers/?company=${data.idCompany}`}>
        {data.companyName}
      </Link>
      <p>{data.salary} PLN</p>
      <p>{data.description}</p>
      <Button className=""> Apply</Button>
    </div>
  );
};

export default JobOfferPreviewPage;
