import { createRecruiter } from '@/api/recruiters/recruiters';
import RecruiterForm from '@/components/RecruiterForm/RecruiterForm';
import { Paths } from '@/constants/paths';
import { IRecruiterInputForm } from '@/types/recruiterTypes';
import { IoMdArrowBack } from 'react-icons/io';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddRecruiterPage = () => {
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { isLoading: mutationLoading, mutate } = useMutation(['add', id], createRecruiter, {
    onSuccess: () => {
      toast.success('Practical task edited successfully');
      navigate(Paths.recruiters.path);
      queryClient.refetchQueries('recruiters');
    },
    onError: () => {
      toast.error('Error while editing practical task');
    },
  });

  const onSubmit = (data: IRecruiterInputForm) => {
    mutate(data);
  };

  return (
    <div className="container flex flex-1 flex-col gap-3 bg-light p-8">
      <div className="mb-4 flex items-center gap-2">
        <button onClick={() => navigate(-1)}>
          <IoMdArrowBack className="text-dark" size={24} />
        </button>
        <h3 className="text-2xl font-semibold text-dark">Add Recruiter</h3>
      </div>
      <RecruiterForm onSubmit={onSubmit} mutationLoading={mutationLoading} />
    </div>
  );
};

export default AddRecruiterPage;
