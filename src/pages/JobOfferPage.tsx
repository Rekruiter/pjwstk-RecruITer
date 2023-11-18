import { useQuery } from 'react-query';
import { getJobOfferList } from '../api/jobOffers/jobOffers';
import Spinner from '../components/UI/Spinner/Spinner';
import { useNavigate } from 'react-router-dom';
import { GetPathsLinks } from '../constants/paths';
import JobOfferListElement from '../components/JobOfferContent/JobOfferListElement';

const JobOfferPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery('jobOffers', getJobOfferList);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div className="m-auto">An error occured</div>;
  }

  const handleOpenJobOffer = (id: number) => {
    navigate(GetPathsLinks.getJobOfferPreview(id));
  };

  return (
    <div className="flex flex-col">
      <div className="w-full sticky top-24 bg-dark_blue text-center text-light shadow-xl">
        <h4 className="text-xl mt-4">Search for job offers</h4>
        <div className="flex justify-between container p-6 md:px-20 lg:px-32 mb-2">
          <p>Technology</p>
          <p>Salary</p>
          <p>Location</p>
          <p>Seniority</p>
        </div>
      </div>
      <div className="container p-8 md:px-12 lg:px-16 rounded-b-xl">
        {data?.map((jobOffer) => (
          <JobOfferListElement handleOpenJobOffer={handleOpenJobOffer} jobOfferData={jobOffer} key={jobOffer.id} />
        ))}
        {!data && <p className="mx-auto w-fit py-10">No results found</p>}
      </div>
    </div>
  );
};

export default JobOfferPage;
