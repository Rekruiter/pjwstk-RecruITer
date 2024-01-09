import { GetPathsLinks } from '@/constants/paths';
import { capitalizeFirstLetter } from '@/helpers';
import { cn } from '@/lib/utils';
import { ICompanyJobOfferListElement } from '@/types/jobOfferTypes';
import { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import ExtendJobOfferModal from './ExtendJobOfferModal';

interface CompanyJobOffersListProps {
  jobOffers: ICompanyJobOfferListElement[];
}

const CompanyJobOffersList = ({ jobOffers }: CompanyJobOffersListProps) => {
  const [taskType, setTaskType] = useState<'current' | 'expired'>('current');
  const categories = ['current', 'expired'] as const;
  const [showExtendModal, setShowExtendModal] = useState(false);
  const [pickedJobOfferId, setPickedJobOfferId] = useState<number | null>(null);

  const navigate = useNavigate();

  const TabElement = ({ category }: { category: 'current' | 'expired' }) => (
    <div
      className={cn('basis-1/2 rounded-sm p-1', {
        '': taskType === category,
      })}>
      <button
        onClick={() => {
          if (taskType === category) {
            return;
          }
          setTaskType(category);
        }}
        className={cn('w-full rounded-sm p-2 text-light/70 shadow-md', {
          'bg-light/20 text-light': taskType === category,
        })}>
        {capitalizeFirstLetter(category)}
      </button>
    </div>
  );

  const pickedJobOffers = jobOffers.filter((jobOffer) => {
    if (taskType === 'current') {
      return new Date(jobOffer.dateExpires).getTime() > Date.now();
    }

    return new Date(jobOffer.dateExpires).getTime() < Date.now();
  });

  return (
    <>
      <div className="flex w-full rounded-md bg-dark_blue px-2 sm:px-0">
        <TabElement category={categories[0]} />
        <TabElement category={categories[1]} />
      </div>
      <div className="flex flex-col gap-2 rounded-sm">
        {pickedJobOffers.map((jobOffer) => (
          <div
            key={jobOffer.id}
            className="group flex w-full cursor-pointer justify-between rounded-md bg-dark/10 p-2 text-dark shadow-md hover:bg-orange hover:text-light"
            onClick={() => {
              navigate(GetPathsLinks.getJobOfferApplications(jobOffer.id));
            }}>
            <div className="flex w-full flex-wrap md:w-2/3">
              <div className="basis-full md:basis-3/4">
                <p className="line-clamp-1 overflow-hidden">{jobOffer.title}</p>
              </div>
              <p className="basis-1/2 md:basis-1/4 md:text-center">{jobOffer.location}</p>
              <p className="md:text-cener basis-full">Application Count: {jobOffer.applicationsCount}</p>
            </div>
            <button
              className="underline hover:scale-110"
              onClick={(e) => {
                e.stopPropagation();
                setPickedJobOfferId(jobOffer.id);
                setShowExtendModal(true);
              }}>
              Extend job offer
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(GetPathsLinks.getJobOfferEdit(jobOffer.id));
              }}>
              <CiEdit size={32} />
            </button>
          </div>
        ))}
      </div>
      {showExtendModal && pickedJobOfferId !== null && (
        <ExtendJobOfferModal
          jobOffer={jobOffers.find((jobOffer) => jobOffer.id === pickedJobOfferId)}
          handleCloseModal={() => {
            setPickedJobOfferId(null);
            setShowExtendModal(false);
          }}
        />
      )}
    </>
  );
};

export default CompanyJobOffersList;
