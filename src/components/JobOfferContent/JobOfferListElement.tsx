import { IJobOffer } from '../../types/jobOfferTypes';

interface JobOfferListElementProps {
  handleOpenJobOffer: (id: number) => void;
  jobOfferData: IJobOffer;
}

const JobOfferListElement = ({ handleOpenJobOffer, jobOfferData }: JobOfferListElementProps) => {
  return (
    <div
      className={
        'group flex max-w-full cursor-pointer flex-wrap justify-between break-all bg-dark/5 px-5 py-2 text-dark shadow-sm hover:bg-orange sm:flex-nowrap sm:justify-normal'
      }
      onClick={() => handleOpenJobOffer(jobOfferData.id)}>
      <div className="min-w-[5.5rem] basis-1/2 gap-2 group-hover:text-light">
        <p className="w-fit group-hover:scale-110 group-hover:underline">{jobOfferData.title}</p>
        <p className="text-xs">{jobOfferData.companyName}</p>
      </div>
      <div className="flex min-w-3 basis-1/2 flex-wrap justify-center gap-x-3 gap-y-1 text-sm sm:mx-2 sm:basis-1/6">
        {Object.keys(jobOfferData.requirements)
          .slice(0, 2)
          .map((key) => (
            <p
              key={key}
              className="line-clamp-1 h-fit border border-dark p-1 group-hover:border-light group-hover:text-light">
              {key}
            </p>
          ))}
      </div>
      <p className="min-w-3 basis-1/2 text-center group-hover:text-light sm:basis-1/6">
        {jobOfferData.minSalary}
        {jobOfferData.maxSalary !== null && `-${jobOfferData.maxSalary}`} {jobOfferData.currency}
      </p>
      <p className="min-w-4.25 basis-1/2 text-center group-hover:text-light sm:mx-2 sm:basis-1/6">
        {jobOfferData.location ? jobOfferData.location : jobOfferData.isRemote ? 'Remote' : 'No location specified'}
      </p>
    </div>
  );
};

export default JobOfferListElement;
