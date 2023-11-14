import { useQuery } from 'react-query';
import { JobOffer, fetchJobOffers } from '../api/jobOffers/jobOffers';
import Spinner from '../components/UI/Spinner/Spinner';
import { useNavigate } from 'react-router-dom';
import { GetPathsLinks } from '../constants/paths';

const jobOfferHeader = ['Position', 'Location', 'Salary'] as const;

const JobOfferPage = () => {
  const { data, isLoading, error } = useQuery<JobOffer[], Error>('jobOffers', fetchJobOffers);
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
    <div className="container p-6 md:px-12 lg:px-16 flex flex-col rounded-xl overflow-hidden">
      <div className="w-full bg-light_blue h-16 text-center px-2 rounded-t-xl"> panel do wyszkuwania/filtrowania</div>
      <div className="flex bg-dark_blue text-light px-5">
        <p className="basis-3/5 text-center min-w-7.5">{jobOfferHeader[0]}</p>
        <p className="basis-1/5 text-center min-w-4.25">{jobOfferHeader[1]}</p>
        <p className="basis-1/5 text-center min-w-3">{jobOfferHeader[2]}</p>
      </div>
      {data?.map((jobOffer, index) => (
        <div
          className={`flex border max-w-full bg-light py-2 px-5 cursor-pointer hover:bg-light_blue group ${
            index === data.length - 1 ? 'rounded-b-xl' : ''
          }`}
          onClick={() => handleOpenJobOffer(jobOffer.id)}
          key={jobOffer.id}>
          <div className="basis-3/5 min-w-7.5 gap-2 break-all">
            <p className="group-hover:scale-105 w-fit">{jobOffer.title}</p>
            <p>{jobOffer.description}</p>
          </div>
          <p className="basis-1/5 text-center min-w-4.25">{jobOffer.title}</p>
          <p className="basis-1/5 text-center min-w-3">{jobOffer.salary}</p>
        </div>
      ))}
      {!data && <div className="mx-auto py-10">No results found</div>}
    </div>
  );
};

export default JobOfferPage;
