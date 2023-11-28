import { ICandidateApplication } from '../../types/applicationTypes';

interface CandidateApplicationListElementProps {
  handleOpenApplication: (id: number) => void;
  applicationData: ICandidateApplication;
}

const CandidateApplicationListElement = ({
  applicationData,
  handleOpenApplication,
}: CandidateApplicationListElementProps) => {
  return (
    <div
      className={
        'flex flex-wrap sm:flex-nowrap justify-between sm:justify-normal border max-w-full break-all bg-light text-dark py-2 px-5 cursor-pointer hover:bg-orange group'
      }
      onClick={() => handleOpenApplication(applicationData.applicationId)}>
      <div className="basis-1/2 min-w-[5.5rem] gap-2 group-hover:text-light">
        <p className="group-hover:scale-110 group-hover:underline w-fit">{applicationData.jobOfferTitle}</p>
        <p className="text-xs">{applicationData.isAccepted}</p>
      </div>
    </div>
  );
};

export default CandidateApplicationListElement;
