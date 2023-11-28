import { IRecruiterrApplication } from '../../types/applicationTypes';

interface RecruiterApplicationListElementProps {
  applicationData: IRecruiterrApplication;
  handleOpenApplication: (id: number) => void;
}

const RecruiterApplicationListElement = ({
  applicationData,
  handleOpenApplication,
}: RecruiterApplicationListElementProps) => {
  return (
    <div
      className={
        'flex flex-wrap sm:flex-nowrap justify-between sm:justify-normal border max-w-full break-all bg-light text-dark py-2 px-5 cursor-pointer hover:bg-orange group'
      }
      onClick={() => handleOpenApplication(applicationData.applicationId)}>
      <div className="basis-1/2 min-w-[5.5rem] gap-2 group-hover:text-light">
        <p className="group-hover:scale-110 group-hover:underline w-fit">{applicationData.jobOfferTitle}</p>
        <p className="group-hover:scale-110 group-hover:underline w-fit">{applicationData.candidateName}</p>
        <p className="group-hover:scale-110 group-hover:underline w-fit">{applicationData.candidateSurname}</p>
        <p className="group-hover:scale-110 group-hover:underline w-fit">{applicationData.candidateEmail}</p>
        <p className="text-xs">{applicationData.isAccepted}</p>
      </div>
      <p className="group-hover:scale-110 group-hover:underline w-fit">{applicationData.isAccepted}</p>
    </div>
  );
};

export default RecruiterApplicationListElement;
