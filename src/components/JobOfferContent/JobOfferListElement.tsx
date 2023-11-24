import { IJobOffer } from '../../types/jobOfferTypes';

interface JobOfferListElementProps {
  handleOpenJobOffer: (id: number) => void;
  jobOfferData: IJobOffer;
}

const JobOfferListElement = ({ handleOpenJobOffer, jobOfferData }: JobOfferListElementProps) => {
  return (
    <div
      className={
        'flex flex-wrap sm:flex-nowrap justify-between sm:justify-normal border max-w-full break-all bg-light text-dark py-2 px-5 cursor-pointer hover:bg-orange group'
      }
      onClick={() => handleOpenJobOffer(jobOfferData.id)}>
      <div className="basis-1/2 min-w-[5.5rem] gap-2 group-hover:text-light">
        <p className="group-hover:scale-110 group-hover:underline w-fit">{jobOfferData.title}</p>
        <p className="text-xs">{jobOfferData.companyName}</p>
      </div>
      <div className="basis-1/2 sm:basis-1/6 min-w-3 flex flex-wrap justify-center gap-x-3 gap-y-1 text-sm sm:mx-2">
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
      <p className="basis-1/2 sm:basis-1/6 text-center group-hover:text-light min-w-3">
        {jobOfferData.minSalary}
        {jobOfferData.maxSalary !== null && `-${jobOfferData.maxSalary}`} {jobOfferData.currency}
      </p>
      <p className="basis-1/2 sm:basis-1/6 text-center group-hover:text-light min-w-4.25 sm:mx-2">
        {jobOfferData.location}
      </p>
    </div>
  );
};

export default JobOfferListElement;
