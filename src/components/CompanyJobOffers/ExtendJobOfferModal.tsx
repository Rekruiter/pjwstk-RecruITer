import { MAX_DATE, MIN_DATE } from '@/constants/dateInputValues';
import { ICompanyJobOfferListElement } from '@/types/jobOfferTypes';
import { Transition, Dialog } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Button from '../UI/Button';
import { useMutation } from 'react-query';
import { extendJobOfferPut } from '@/api/jobOffers/addJobOffer';
import Spinner from '../UI/Spinner/Spinner';
import { formatISODateTOYYYYMMDD } from '@/helpers';
import { toast } from 'react-toastify';

interface ExtendJobOfferModalProps {
  handleCloseModal: () => void;
  jobOffer?: ICompanyJobOfferListElement;
}

const ExtendJobOfferModal = ({ handleCloseModal, jobOffer }: ExtendJobOfferModalProps) => {
  const [dateError, setDateError] = useState<null | { message: string }>(null);

  const { isLoading, mutate } = useMutation('extendJobOffer', extendJobOfferPut, {
    onSuccess: () => {
      toast.success(`Job offer ${jobOffer?.title} extended successfully`);
      handleCloseModal();
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });

  if (!jobOffer) {
    return null;
  }

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }
    setDateError(null);
    const date = e.currentTarget['newExpirationDate'].value;
    if (new Date(date).getTime() < Date.now()) {
      setDateError({ message: 'Date must be in the future' });
      return;
    }
    if (!date) {
      setDateError({ message: 'Date is required' });
      return;
    }

    mutate({
      id: jobOffer.id,
      dateExpires: date,
    });
  };

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleCloseModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-8 text-dark">
                  You are extending job offer:
                  <br /> {jobOffer.title}
                </Dialog.Title>
                <form onSubmit={onSubmitHandler} className="flex flex-col gap-5">
                  <div className="mt-5 flex flex-col gap-1">
                    <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-5">
                      <label className="text-dark" htmlFor="newExpirationDate">
                        New expiration date
                      </label>
                      <input
                        className="rounded-md p-1 text-dark"
                        type="date"
                        min={MIN_DATE}
                        max={MAX_DATE}
                        id="newExpirationDate"
                        defaultValue={formatISODateTOYYYYMMDD(new Date(jobOffer.dateExpires).toISOString())}
                      />
                    </div>
                    {dateError && <span className="text-error_color">{dateError.message}</span>}
                  </div>
                  <Button type="submit">{isLoading ? <Spinner isLight /> : 'Extend job offer'}</Button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ExtendJobOfferModal;
