import { cn } from '@/lib/utils';
import { IPublicTheoreticalTask } from '@/types/tasksTypes';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface TheoreticalTaskListItemProps {
  taskData: IPublicTheoreticalTask;
  to: string;
  className?: string;
}

const TheoreticalTaskListItem = ({ taskData, to, className }: TheoreticalTaskListItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        'group flex cursor-pointer flex-col gap-2 rounded-md bg-dark/5 p-2 text-dark shadow-sm hover:bg-orange hover:text-light',
        className,
      )}>
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
