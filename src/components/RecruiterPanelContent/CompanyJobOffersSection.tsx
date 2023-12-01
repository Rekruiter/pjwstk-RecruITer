import { useNavigate } from 'react-router-dom';
import { IRecruiterPanel } from '../../types/panelPageTypes';
import { GetPathsLinks, Paths } from '../../constants/paths';
import Button from '../UI/Button';
import PanelSectionWrapper from '../UI/PanelSectionWrapper';

interface ProposedJobOffersSectionProps {
  jobOffers: IRecruiterPanel['jobOffers'];
}

const CompanyJobOffersSection = ({ jobOffers }: ProposedJobOffersSectionProps) => {
  const navigate = useNavigate();

  return (
    <PanelSectionWrapper
      headerClickHandler={() => {
        navigate(Paths.jobOffers.path);
      }}
      headerTitle="Job offer">
      {jobOffers.map((jobOffer) => (
        <div
          key={jobOffer.id}
          className="flex w-full cursor-pointer flex-wrap gap-x-10 border p-2 text-light hover:bg-orange"
          onClick={() => {
            navigate(GetPathsLinks.getJobOfferPreview(jobOffer.id));
          }}>
          <div className="basis-full md:basis-1/2">
            <p className="line-clamp-1 overflow-hidden">{jobOffer.title}</p>
          </div>
          <p className="basis-1/2 md:basis-1/4 md:text-center">{jobOffer.location}</p>
          <p className="md:text-cener md:basis-1/4">Application Count: {jobOffer.applicationsCount}</p>
        </div>
      ))}
      <Button className="mx-auto my-2 w-fit">Add new job offer</Button>
    </PanelSectionWrapper>
  );
};

export default CompanyJobOffersSection;
