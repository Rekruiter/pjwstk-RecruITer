import { getRecruiter, updateRecruiter } from '@/api/recruiters/recruiters';
import RecruiterForm from '@/components/RecruiterForm/RecruiterForm';
import Spinner from '@/components/UI/Spinner/Spinner';
import { Paths } from '@/constants/paths';
import { IRecruiterInputForm } from '@/types/recruiterTypes';
import { IoMdArrowBack } from 'react-icons/io';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditRecruiterPage = () => {
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { isLoading: mutationLoading, mutate } = useMutation(['editRecruiter', id], updateRecruiter, {
    onSuccess: () => {
      toast.success('Practical task edited successfully');
      navigate(Paths.recruiters.path);
      queryClient.refetchQueries('recruiters');
    },
    onError: () => {
      toast.error('Error while editing practical task');
    },
  });

  const { data, isLoading, isError } = useQuery(['recruiter', id], () => getRecruiter(id), {
    cacheTime: 1,
  });

  const onSubmit = (data: IRecruiterInputForm) => {
    mutate({
      id,
      ...data,
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <p className="m-auto">An error occured, please try again later</p>;
  }

  return (
    <div className="container flex flex-1 flex-col gap-3 bg-light p-8">
      <div className="mb-4 flex items-center gap-2">
        <button onClick={() => navigate(-1)}>
          <IoMdArrowBack className="text-dark" size={24} />
        </button>
        <h3 className="text-2xl font-semibold text-dark">Edit Recruiter</h3>
      </div>
      {data && <RecruiterForm onSubmit={onSubmit} mutationLoading={mutationLoading} defaultValues={data} />}
    </div>
  );
};

export default EditRecruiterPage;
