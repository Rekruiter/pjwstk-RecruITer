import { editPracticalTaskPut } from '@/api/tasks/companyTasks';
import { getPublicPracticalTask } from '@/api/tasks/publicTasks';
import NewPracticalTaskForm from '@/components/TasksForms/NewPracticalTaskForm/NewPracticalTaskForm';
import Spinner from '@/components/UI/Spinner/Spinner';
import { GetPathsLinks } from '@/constants/paths';
import { IPracticalTaskFormInput } from '@/types/tasksTypes';
import { IoMdArrowBack } from 'react-icons/io';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditPracticalTaskPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };

  const { isLoading, mutate } = useMutation(['editPracticalTask', id], editPracticalTaskPut, {
    onSuccess: () => {
      toast.success('Practical task edited successfully');
      navigate(GetPathsLinks.getCompanyPracticalTasksList());
      queryClient.refetchQueries('companyPracticalTasks');
    },
    onError: () => {
      toast.error('Error while editing practical task');
    },
  });

  const {
    data: taskData,
    isLoading: taskLoading,
    isError,
  } = useQuery(['PracticalTask', id], () => getPublicPracticalTask(id), {
    cacheTime: 0,
  });

  const onSubmit = (data: IPracticalTaskFormInput) => {
    mutate({
      id,
      inputData: data,
    });
  };

  if (taskLoading) {
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
        <h3 className="text-2xl font-semibold text-dark">Editing practical task</h3>
      </div>
      {taskData && <NewPracticalTaskForm onSubmit={onSubmit} mutationLoading={isLoading} defaultValues={taskData} />}
    </div>
  );
};

export default EditPracticalTaskPage;
