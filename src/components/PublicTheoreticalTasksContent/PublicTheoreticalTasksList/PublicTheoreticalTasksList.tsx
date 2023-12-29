import Spinner from '@/components/UI/Spinner/Spinner';
import { IPublicTheoreticalTask } from '@/types/tasksTypes';
import TheoreticalTaskListItem from './TheoreticalTaskListItem';

interface PublicTheoreticalTasksListProps {
  tasks: IPublicTheoreticalTask[];
  isFetching: boolean;
}

const PublicTheoreticalTasksList = ({ isFetching, tasks }: PublicTheoreticalTasksListProps) => {
  return (
    <div className="flex flex-col gap-1 rounded-b-xl p-8 md:px-12 lg:px-16">
      <h3 className="mb-4 text-2xl font-semibold text-dark">Tasks section</h3>
      <div className="flex w-full flex-col gap-2 rounded-md p-4">
        {isFetching ? <Spinner /> : tasks.map((task) => <TheoreticalTaskListItem key={task.id} taskData={task} />)}
      </div>
    </div>
  );
};

export default PublicTheoreticalTasksList;
