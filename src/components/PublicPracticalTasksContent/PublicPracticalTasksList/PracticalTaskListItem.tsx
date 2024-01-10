import { cn } from '@/lib/utils';
import { IPublicPracticalTask } from '@/types/tasksTypes';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface PracticalTaskListItemProps {
  question: string;
  difficultyLevel: number;
  practicalTasksSolutions: IPublicPracticalTask['practicalTaskSolutions'];
  to: string;
  className?: string;
}

const PracticalTaskListItem = ({
  difficultyLevel,
  practicalTasksSolutions,
  question,
  to,
  className,
}: PracticalTaskListItemProps) => {
  const technologies = practicalTasksSolutions.map((solution) => solution.compilationLanguage);
  return (
    <Link
      to={to}
      className={cn(
        'group flex cursor-pointer flex-col gap-2 rounded-md bg-dark/5 p-2 text-dark shadow-sm hover:bg-orange hover:text-light',
        className,
      )}>
      <p className="font-semibold">{question}</p>
      <div className="flex justify-between">
        <div className="flex gap-2">
          {technologies.map((technology, index) => (
            <p key={index}>{technology}</p>
          ))}
        </div>
        <div className="inline-flex text-orange group-hover:text-light">
          {Array(difficultyLevel)
            .fill(0)
            .map((_, index) => (
              <FaStar key={index} />
            ))}
        </div>
      </div>
    </Link>
  );
};

export default PracticalTaskListItem;
