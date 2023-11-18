import { IJobOffer } from '../../types/jobOfferTypes';

interface JobOfferListElementProps {
  handleOpenJobOffer: (id: number) => void;
  jobOfferData: IJobOffer;
}

const JobOfferListElement = ({ handleOpenJobOffer, jobOfferData }: JobOfferListElementProps) => {
  return (
    <div
      className={'flex border max-w-full break-all bg-light text-dark py-2 px-5 cursor-pointer hover:bg-orange group'}
      onClick={() => handleOpenJobOffer(jobOfferData.id)}>
      <div className="basis-1/2 min-w-7.5 gap-2 group-hover:text-light">
        <p className="group-hover:scale-110 group-hover:underline w-fit">{jobOfferData.title}</p>
        <p className="text-xs">{jobOfferData.companyName}</p>
      </div>
      <div className="basis-1/6 min-w-3 flex flex-wrap gap-x-3 gap-y-1 text-sm mx-2">
        {Object.keys(jobOfferData.requirements)
          .slice(0, 2)
          .map((key) => (
            <p
              key={key}
              className="group-hover:text-light border border-dark group-hover:border-light p-1 h-fit line-clamp-1">
              {key}
            </p>
          ))}
      </div>
      <p className="basis-1/6 text-center group-hover:text-light min-w-4.25 mx-2">Warsaw/Remote</p>
      <p className="basis-1/6 text-center group-hover:text-light min-w-3">
        {jobOfferData.minSalary}
        {jobOfferData.maxSalary !== null && `-${jobOfferData.maxSalary}`} {jobOfferData.currency}
      </p>
    </div>
  );
};

export default JobOfferListElement;
