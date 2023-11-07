import { useQuery } from 'react-query';
import { JobOffer, fetchJobOffers } from '../api/jobOffers/jobOffers';
import Spinner from '../components/UI/Spinner/Spinner';
import { useNavigate } from 'react-router-dom';
import { GetPathsLinks } from '../constants/paths';

const jobOfferHeader = ['Position', 'Location', 'Salary'] as const;

const JobOfferPage = () => {
  const { data, isLoading, error } = useQuery<JobOffer[], Error>('joOffers', fetchJobOffers);
  const navigate = useNavigate();

  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <div>Error {error?.message}</div>;
  }

  const handleOpenJobOffer = (id: string) => {
    navigate(GetPathsLinks.getJobOfferPreview(id));
  };

  return (
    <div className="container flex-1 p-6 md:px-12 lg:px-16 flex flex-col rounded-xl overflow-hidden min-w-fit">
      <div className="w-full bg-light_blue h-16 text-center px-2"> panel do wyszkuwania/filtrowania</div>
      <div className="flex bg-dark_blue text-light px-5">
        <p className="basis-3/5 text-center">{jobOfferHeader[0]}</p>
        <p className="basis-1/5 text-center">{jobOfferHeader[1]}</p>
        <p className="basis-1/5 text-center">{jobOfferHeader[2]}</p>
      </div>
      {data?.map((jobOffer) => (
        <div
          className="flex border bg-light py-2 px-5"
          onClick={() => handleOpenJobOffer(jobOffer.id)}
          key={jobOffer.id}>
          <div className="basis-3/5">
            <p className="text-base">{jobOffer.title}</p>
            <p>{jobOffer.companyName}</p>
          </div>
          <p className="basis-1/5 text-center">{jobOffer.title}</p>
          <p className="basis-1/5 text-center">{jobOffer.salary}</p>
        </div>
      ))}
    </div>
  );
};

export default JobOfferPage;
