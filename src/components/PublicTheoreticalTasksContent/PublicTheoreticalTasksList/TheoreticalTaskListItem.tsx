import { GetPathsLinks } from '@/constants/paths';
import { IPublicTheoreticalTask } from '@/types/publicTasksTypes';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface TheoreticalTaskListItemProps {
  taskData: IPublicTheoreticalTask;
}

const TheoreticalTaskListItem = ({ taskData }: TheoreticalTaskListItemProps) => {
  return (
    <Link
      to={GetPathsLinks.getTheoreticalTaskSolve(taskData.id)}
      className="group flex cursor-pointer flex-col gap-2 rounded-md bg-dark/5 p-2 text-dark shadow-sm hover:bg-orange hover:text-light">
      <p className="font-semibold">{taskData.question}</p>
      <div className="flex justify-between">
        <div className="inline-flex text-orange group-hover:text-light">
          {Array(taskData.difficultyLevel)
            .fill(0)
            .map((_, index) => (
              <FaStar key={index} />
            ))}
        </div>
      </div>
    </Link>
  );
};

export default TheoreticalTaskListItem;
