import { useQuery } from 'react-query';
import { getJobOfferList } from '../../api/jobOffers/jobOffers';
import Spinner from '../../components/UI/Spinner/Spinner';
import { useNavigate } from 'react-router-dom';
import { GetPathsLinks } from '../../constants/paths';
import JobOfferListElement from '../../components/JobOfferContent/JobOfferListElement';

const JobOfferListPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery('jobOffers', getJobOfferList);

  const pickedTechnology = 'Javascript';
  const pickedSeniority = 'Junior';
  const pickedLocation = 'Warsaw';

  const signature = `${pickedLocation && pickedLocation + ', '}${pickedSeniority && pickedSeniority + ' '}${
    pickedTechnology && pickedTechnology + ' Developer'
  }`;

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
      <div className="sticky top-24 w-full bg-dark_blue text-center text-light shadow-xl">
        <h4 className="mt-4 text-xl">Search for job offers</h4>
        <div className="container mb-2 flex justify-between p-6 md:px-20 lg:px-32">
          <p>Technology</p>
          <p>Salary</p>
          <p>Location</p>
          <p>Seniority</p>
        </div>
      </div>
      <div className="container flex flex-col gap-1 rounded-b-xl p-8 md:px-12 lg:px-16">
        <h3 className="mb-4 text-2xl font-semibold text-dark">Job offers</h3>
        <h4 className="mb-4 text-base font-semibold text-dark">{signature}</h4>
        {data?.map((jobOffer) => (
          <JobOfferListElement handleOpenJobOffer={handleOpenJobOffer} jobOfferData={jobOffer} key={jobOffer.id} />
        ))}
        {!data && <p className="mx-auto w-fit py-10">No results found</p>}
      </div>
    </div>
  );
};

export default JobOfferListPage;
