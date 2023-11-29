import { useNavigate } from 'react-router-dom';
import { Paths } from '../../constants/paths';
import { IUserPanel } from '../../types/panelPageTypes';
import { FaStar } from 'react-icons/fa';

interface LastTasksSectionProps {
  tasks: NonNullable<IUserPanel['lastTasks']>;
}

const LastTasksSection = ({ tasks }: LastTasksSectionProps) => {
  const navigate = useNavigate();
  return (
    <div className="sm:basis-1/2">
      <div className="flex flex-col gap-2 rounded-lg border border-light bg-dark_blue p-3">
        <h5
          className="mx-auto cursor-pointer text-lg font-semibold text-light"
          onClick={() => {
            navigate(Paths.home.path); // TODO: Change it to 'tasks'
          }}>
          Last tasks
        </h5>
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex w-full cursor-pointer flex-wrap border p-2 text-light hover:bg-orange"
            onClick={() => {
              // navigate to task
            }}>
            <div className="basis-full">
              <p className="line-clamp-2 overflow-hidden">{task.question}</p>
            </div>
            <p className="md:text-cener basis-1/4 text-sm">{task.compilationLanguage}</p>
            <div className="inline-flex text-orange">
              {Array(task.difficultyLevel)
                .fill(0)
                .map(() => (
                  <FaStar />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LastTasksSection;
