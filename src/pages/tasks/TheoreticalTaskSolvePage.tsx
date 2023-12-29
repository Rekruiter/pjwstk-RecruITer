import { getPublicTheoreticalTask } from '@/api/tasks/publicTasks';
import TheoreticalTaskSolveContent from '@/components/TheoreticalTaskSolveContent/TheoreticalTaskSolveContent';
import Spinner from '@/components/UI/Spinner/Spinner';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

const TheoreticalTaskSolvePage = () => {
  const { id } = useParams() as { id: string };

  const { data, isError, isLoading } = useQuery(['theoreticalTask', id], () => getPublicTheoreticalTask(id));

  if (isError) {
    return <div className="m-auto">An error ocurred</div>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (!data) {
    return <div className="m-auto">Theoretical task not found</div>;
  }

  return <TheoreticalTaskSolveContent task={data} />;
};

export default TheoreticalTaskSolvePage;
