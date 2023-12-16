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
        'group flex max-w-full cursor-pointer flex-wrap justify-between break-all border bg-light px-5 py-2 text-dark hover:bg-orange sm:flex-nowrap sm:justify-normal'
      }
      onClick={() => handleOpenApplication(applicationData.applicationId)}>
      <div className="min-w-[5.5rem] basis-1/2 gap-2 group-hover:text-light">
        <p className="w-fit group-hover:scale-110 group-hover:underline">{applicationData.jobOfferTitle}</p>
        <p className="w-fit group-hover:scale-110 group-hover:underline">{applicationData.candidateName}</p>
        <p className="w-fit group-hover:scale-110 group-hover:underline">{applicationData.candidateSurname}</p>
        <p className="w-fit group-hover:scale-110 group-hover:underline">{applicationData.candidateEmail}</p>
        <p className="text-xs">{applicationData.isAccepted}</p>
      </div>
      <p className="w-fit group-hover:scale-110 group-hover:underline">{applicationData.isAccepted}</p>
    </div>
  );
};

export default RecruiterApplicationListElement;
