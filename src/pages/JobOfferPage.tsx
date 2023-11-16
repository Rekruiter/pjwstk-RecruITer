import { useQuery } from 'react-query';
import { getJobOfferList } from '../api/jobOffers/jobOffers';
import Spinner from '../components/UI/Spinner/Spinner';
import { useNavigate } from 'react-router-dom';
import { GetPathsLinks } from '../constants/paths';

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
    <div className="flex flex-col overflow-hidden">
      <div className="w-full bg-dark_blue h-16 text-center px-2 text-light">
        panel do wyszkuwania/filtrowania //TODO: Make it fixed on site
      </div>
      <div className="container p-6 md:px-12 lg:px-16">
        {data?.map((jobOffer, index) => (
          <div
            className={`flex border max-w-full break-all bg-light text-dark py-2 px-5 cursor-pointer hover:bg-orange group ${
              index === data.length - 1 ? 'rounded-b-xl' : ''
            }`}
            onClick={() => handleOpenJobOffer(jobOffer.id)}
            key={jobOffer.id}>
            <div className="basis-1/2 min-w-7.5 gap-2 group-hover:text-light">
              <p className="group-hover:scale-110 group-hover:underline w-fit">{jobOffer.title}</p>
              <p className="text-xs">{jobOffer.companyName}</p>
            </div>
            <div className="basis-1/6 min-w-3 flex flex-wrap gap-x-3 text-sm">
              {Object.keys(jobOffer.requirements)
                .slice(0, 2)
                .map((key) => (
                  <div className="group-hover:text-light border border-dark group-hover:border-light p-1 h-fit">
                    {key}
                  </div>
                ))}
            </div>
            <p className="basis-1/6 text-center group-hover:text-light min-w-4.25">Warsaw/Remote</p>
            <p className="basis-1/6 text-center group-hover:text-light min-w-3">
              {jobOffer.minSalary}
              {jobOffer.maxSalary !== null && `-${jobOffer.maxSalary}`} {jobOffer.currency}
            </p>
          </div>
        ))}
        {!data && <div className="mx-auto py-10">No results found</div>}
      </div>
    </div>
  );
};

export default JobOfferPage;
