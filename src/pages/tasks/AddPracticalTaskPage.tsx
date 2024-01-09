import { addPracticalTaskPost } from '@/api/tasks/companyTasks';
import NewPracticalTaskForm from '@/components/TasksForms/NewPracticalTaskForm/NewPracticalTaskForm';
import { GetPathsLinks } from '@/constants/paths';
import { IPracticalTaskFormInput } from '@/types/tasksTypes';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddPracticalTaskPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading, mutate } = useMutation('addPracticalTask', addPracticalTaskPost, {
    onSuccess: () => {
      toast.success('Practical task added successfully');
      navigate(GetPathsLinks.getCompanyPracticalTasksList());
      queryClient.refetchQueries('companyPracticalTasks');
    },
    onError: () => {
      // TODO: Add erorr handling
      toast.error('Error while adding practical task');
    },
  });

  const onSubmit = (data: IPracticalTaskFormInput) => {
    mutate(data);
  };

  return (
    <div className="container flex flex-1 flex-col gap-3 bg-light p-8">
      <h3 className="mb-4 text-2xl font-semibold text-dark">Adding practical task</h3>
      <NewPracticalTaskForm onSubmit={onSubmit} mutationLoading={isLoading} />
    </div>
  );
};

export default AddPracticalTaskPage;
