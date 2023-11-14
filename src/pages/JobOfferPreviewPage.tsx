import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { JobOffer, fetchJobOffer } from '../api/jobOffers/jobOffers';
import Spinner from '../components/UI/Spinner/Spinner';
import Button from '../components/UI/Button';
import { GetPathsLinks } from '../constants/paths';

const JobOfferPreviewPage = () => {
  const { id } = useParams() as { id: string };

  const { data, error, isLoading } = useQuery<JobOffer, Error>(['jobOffer', id], () => fetchJobOffer(id), {});

  if (error) {
    return <div className="m-auto">Error {error?.message}</div>;
  }

  if (!data || isLoading) {
    return <Spinner />;
  }

  const daysLeft = Math.round((new Date(data.dateExpires).getTime() - Date.now()) / (24 * 60 * 60 * 1000));

  const dateAdded = new Date(data.dateAdded);

  return (
    <div className="flex-1 container bg-light flex flex-col gap-3 p-8">
      <h2 className="text-center text-dark text-title_bold w-fit rounded-xl">{data.title}</h2>
      <Link className="cursor-pointer hover:text-orange" to={GetPathsLinks.getJobOffersWithFilters(data.idCompany)}>
        {data.companyName}
      </Link>
      <p>Salary: {data.salary} [currency]</p>
      <p>Description: {data.description}</p>
      <p>Requirements: {data.requirements}</p>
      <p>This job ofer expires in {daysLeft} days</p>
      <p>
        Available since: {dateAdded.getDate()}-{dateAdded.getMonth()}-{dateAdded.getFullYear()}
      </p>
      <Button className=""> Apply</Button>
    </div>
  );
};

export default JobOfferPreviewPage;
