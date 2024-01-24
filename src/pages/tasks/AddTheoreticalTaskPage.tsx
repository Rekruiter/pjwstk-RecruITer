import { addTheoreticalTaskPost } from '@/api/tasks/companyTasks';
import NewTheoreticalTaskForm from '@/components/TasksForms/NewTheoreticalTaskForm/NewTheoreticalTaskForm';
import { GetPathsLinks } from '@/constants/paths';
import { ITheoreticalTaskFormInput } from '@/types/tasksTypes';
import { IoMdArrowBack } from 'react-icons/io';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddTheoreticalTaskPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading, mutate } = useMutation('addTheoreticalTask', addTheoreticalTaskPost, {
    onSuccess: () => {
      toast.success('Theoretical task added successfully');
      navigate(GetPathsLinks.getCompanyTheoreticalTasksList());
      queryClient.refetchQueries('companyTheoreticalTasks-1');
    },
    onError: () => {
      // TODO: Add erorr handling
      toast.error('Error while adding theoretical task');
    },
  });

  const onSubmit = (data: ITheoreticalTaskFormInput) => {
    mutate(data);
  };

  return (
    <div className="container flex flex-1 flex-col gap-3 bg-light p-8">
      <div className="mb-4 flex items-center gap-2">
        <button onClick={() => navigate(-1)}>
          <IoMdArrowBack className="text-dark" size={24} />
        </button>
        <h3 className="text-2xl font-semibold text-dark">Adding theoretical task</h3>
      </div>
      <NewTheoreticalTaskForm onSubmit={onSubmit} mutationLoading={isLoading} />
    </div>
  );
};

export default AddTheoreticalTaskPage;
