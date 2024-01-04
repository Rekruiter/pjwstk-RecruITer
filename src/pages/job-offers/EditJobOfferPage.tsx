import { updateJobOfferPut } from '@/api/jobOffers/addJobOffer';
import NewJobOfferForm from '@/components/NewJobOfferForm/NewJobOfferForm';
import { IJobOfferInput } from '@/types/jobOfferTypes';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';

const EditJobOfferPage = () => {
  const { id } = useParams() as { id: string };

  const { mutate, isLoading: mutationLoading } = useMutation('editJobOffer', updateJobOfferPut, {});

  const onSubmit = (data: IJobOfferInput) => {
    mutate({ ...data, id: id });
  };

  // TODO: add navigation to this page
  return (
    <div className="container flex flex-1 flex-col gap-3 bg-light p-8">
      <h3 className="mb-4 text-2xl font-semibold text-dark">Edit job offer</h3>
      <NewJobOfferForm onSubmit={onSubmit} mutationLoading={mutationLoading} />
    </div>
  );
};

export default EditJobOfferPage;
