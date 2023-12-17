import { useNavigate } from 'react-router-dom';
import { IUserPanel } from '../../types/panelPageTypes';
import { GetPathsLinks, Paths } from '../../constants/paths';
import PanelSectionWrapper from '../UI/PanelSectionWrapper';

interface ProposedJobOffersSectionProps {
  jobOffers: NonNullable<IUserPanel['jobOffers']>;
}

const ProposedJobOffersSection = ({ jobOffers }: ProposedJobOffersSectionProps) => {
  const navigate = useNavigate();

  return (
    <PanelSectionWrapper
      headerClickHandler={() => {
        navigate(Paths.jobOffers.path);
      }}
      headerTitle="Job offers">
      {jobOffers.map((jobOffer) => (
        <div
          key={jobOffer.id}
          className="flex w-full cursor-pointer flex-wrap rounded-md bg-light/5 p-2 text-light shadow-md hover:bg-orange"
          onClick={() => {
            navigate(GetPathsLinks.getJobOfferPreview(jobOffer.id));
          }}>
          <div className="basis-full md:basis-1/2">
            <p className="line-clamp-1 overflow-hidden">{jobOffer.title}</p>
          </div>
          <p className="basis-1/3 md:basis-1/4 md:text-center">{jobOffer.location}</p>
          <p className="md:text-cener basis-full sm:basis-1/3 md:basis-3/4 2xl:basis-1/4">
            {jobOffer.minSalary}
            {jobOffer.maxSalary !== null && `-${jobOffer.maxSalary}`} {jobOffer.currency}
          </p>
          <p className="basis-1/3 text-sm md:basis-full">{jobOffer.companyName}</p>
        </div>
      ))}
    </PanelSectionWrapper>
  );
};

export default ProposedJobOffersSection;
