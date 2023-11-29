import { useNavigate } from 'react-router-dom';
import { IUserPanel } from '../../types/panelPageTypes';
import { GetPathsLinks, Paths } from '../../constants/paths';

interface ProposedJobOffersSectionProps {
  jobOffers: NonNullable<IUserPanel['jobOffers']>;
}

const ProposedJobOffersSection = ({ jobOffers }: ProposedJobOffersSectionProps) => {
  const navigate = useNavigate();

  return (
    <div className="sm:basis-1/2">
      <div className="flex flex-col gap-2 rounded-lg border border-light bg-dark_blue p-3">
        <h5
          className="mx-auto cursor-pointer text-lg font-semibold text-light"
          onClick={() => {
            navigate(Paths.jobOffers.path);
          }}>
          Job offers
        </h5>
        {jobOffers.map((jobOffer) => (
          <div
            key={jobOffer.id}
            className="flex w-full cursor-pointer flex-wrap border p-2 text-light hover:bg-orange"
            onClick={() => {
              navigate(GetPathsLinks.getJobOfferPreview(jobOffer.id));
            }}>
            <div className="basis-full md:basis-1/2">
              <p className="line-clamp-1 overflow-hidden">{jobOffer.title}</p>
            </div>
            <p className="basis-1/3 md:basis-1/4 md:text-center">{jobOffer.location}</p>
            <p className="md:text-cener basis-full sm:basis-1/3 md:basis-1/4">
              {jobOffer.minSalary}
              {jobOffer.maxSalary !== null && `-${jobOffer.maxSalary}`} {jobOffer.currency}
            </p>
            <p className="basis-1/3 text-sm md:basis-full">{jobOffer.companyName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProposedJobOffersSection;
