import { addJobOfferPost } from '@/api/jobOffers/addJobOffer';
import NewJobOfferForm from '@/components/NewJobOfferForm/NewJobOfferForm';
import { IJobOfferInput } from '@/types/jobOfferTypes';
import { useMutation } from 'react-query';

const AddJobOfferPage = () => {
  const { mutate, isLoading: mutationLoading } = useMutation('addJobOffer', addJobOfferPost);

  const onSubmit = (data: IJobOfferInput) => {
    mutate(data);
  };

  return (
    <div className="container flex flex-1 flex-col gap-3 bg-light p-8">
      <h3 className="mb-4 text-2xl font-semibold text-dark">Adding job offer</h3>
      <NewJobOfferForm onSubmit={onSubmit} mutationLoading={mutationLoading} />
    </div>
  );
};

export default AddJobOfferPage;
