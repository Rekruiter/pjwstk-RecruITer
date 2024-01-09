import { addJobOfferPost } from '@/api/jobOffers/addJobOffer';
import NewJobOfferForm from '@/components/NewJobOfferForm/NewJobOfferForm';
import { Paths } from '@/constants/paths';
import { IJobOfferInput } from '@/types/jobOfferTypes';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddJobOfferPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isLoading: mutationLoading } = useMutation('addJobOffer', addJobOfferPost, {
    onSuccess: () => {
      toast.success('Job offer added successfully');
      navigate(Paths.companyJobOffers.path);
      queryClient.refetchQueries('companyJobOffers');
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });

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
