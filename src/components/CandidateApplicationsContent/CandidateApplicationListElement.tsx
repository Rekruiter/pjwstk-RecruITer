import { IApplication } from '../../types/applicationTypes';

interface CandidateApplicationListElementProps {
  handleOpenApplication: (id: number) => void;
  applicationData: IApplication;
}

const CandidateApplicationListElement = ({
  applicationData,
  handleOpenApplication,
}: CandidateApplicationListElementProps) => {
  const status = applicationData.isAccepted === null ? 'Pending' : applicationData.isAccepted ? 'Accepted' : 'Rejected';
  return (
    <div
      className={
        'group flex max-w-full cursor-pointer flex-wrap justify-between break-all border bg-light px-5 py-2 text-dark hover:bg-orange sm:flex-nowrap sm:justify-normal'
      }
      onClick={() => handleOpenApplication(applicationData.applicationId)}>
      <div className="min-w-[5.5rem] basis-1/2 gap-2 group-hover:text-light">
        <p className="w-fit group-hover:scale-110 group-hover:underline">{applicationData.jobOfferTitle}</p>
        <p className="text-xs">{status}</p>
      </div>
    </div>
  );
};

export default CandidateApplicationListElement;
