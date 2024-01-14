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
        navigate(Paths.companyJobOffers.path);
      }}
      headerTitle="Your job offers">
      {jobOffers.map((jobOffer) => (
        <div
          key={jobOffer.id}
          className="flex w-full cursor-pointer flex-wrap rounded-md bg-light/5 p-2 text-light shadow-md hover:bg-orange"
          onClick={() => {
            navigate(GetPathsLinks.getJobOfferApplications(jobOffer.id));
          }}>
          <div className="basis-full md:basis-3/4">
            <p className="line-clamp-1 overflow-hidden">{jobOffer.title}</p>
          </div>
          <p className="basis-1/2 md:basis-1/4 md:text-center">{jobOffer.location}</p>
          <p className="md:text-cener basis-full">Application Count: {jobOffer.applicationsCount}</p>
        </div>
      ))}
      <div className="mt-1 flex w-full flex-1">
        <Button className="m-auto" onClick={() => navigate(Paths.addJobOffer.path)}>
          Add new job offer
        </Button>
      </div>
    </PanelSectionWrapper>
  );
};

export default CompanyJobOffersSection;
