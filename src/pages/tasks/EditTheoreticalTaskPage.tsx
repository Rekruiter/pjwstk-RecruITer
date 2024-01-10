import { editTheoreticalTaskPut } from '@/api/tasks/companyTasks';
import { getPublicTheoreticalTask } from '@/api/tasks/publicTasks';
import NewTheoreticalTaskForm from '@/components/TasksForms/NewTheoreticalTaskForm/NewTheoreticalTaskForm';
import Spinner from '@/components/UI/Spinner/Spinner';
import { GetPathsLinks } from '@/constants/paths';
import { ITheoreticalTaskFormInput } from '@/types/tasksTypes';
import { IoMdArrowBack } from 'react-icons/io';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditTheoreticalTaskPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };

  const { mutate, isLoading } = useMutation(['editTheoreticalTask', id], editTheoreticalTaskPut, {
    onSuccess: () => {
      toast.success('Theoretical task edited successfully');
      navigate(GetPathsLinks.getCompanyTheoreticalTasksList());
      queryClient.refetchQueries('companyTheoreticalTasks');
    },
    onError: () => {
      toast.error('Error while editing theoretical task');
    },
  });

  const {
    data: taskData,
    isLoading: taskLoading,
    isError,
  } = useQuery(['TheoreticalTask', id], () => getPublicTheoreticalTask(id), {
    cacheTime: 0,
  });

  const onSubmit = (data: ITheoreticalTaskFormInput) => {
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
        <h3 className="text-2xl font-semibold text-dark">Editing theoretical task</h3>
      </div>
      {taskData && <NewTheoreticalTaskForm onSubmit={onSubmit} mutationLoading={isLoading} defaultValues={taskData} />}
    </div>
  );
};

export default EditTheoreticalTaskPage;
