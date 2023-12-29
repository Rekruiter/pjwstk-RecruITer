import { getPublicPracticalTask } from '@/api/tasks/publicTasks';
import PracticalTaskSolveContent from '@/components/PracticalTaskSolveContent/PracticalTaskSolveContent';
import Spinner from '@/components/UI/Spinner/Spinner';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

const PracticalTaskSolvePage = () => {
  const { id } = useParams() as { id: string };

  const { data, isError, isLoading } = useQuery(['practicalTask', id], () => getPublicPracticalTask(id));

  if (isError) {
    return <div className="m-auto">An error ocurred</div>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (!data) {
    return <div className="m-auto">Practical task not found</div>;
  }

  return <PracticalTaskSolveContent task={data} />;
};

export default PracticalTaskSolvePage;
