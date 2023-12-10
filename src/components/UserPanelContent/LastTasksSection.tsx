import { useNavigate } from 'react-router-dom';
import { Paths } from '../../constants/paths';
import { IUserPanel } from '../../types/panelPageTypes';
import { FaStar } from 'react-icons/fa';
import PanelSectionWrapper from '../UI/PanelSectionWrapper';

interface LastTasksSectionProps {
  tasks: NonNullable<IUserPanel['lastTasks']>;
}

const LastTasksSection = ({ tasks }: LastTasksSectionProps) => {
  const navigate = useNavigate();
  return (
    <PanelSectionWrapper
      headerClickHandler={() => {
        navigate(Paths.home.path); // TODO: Change it to 'tasks'
      }}
      headerTitle="Last tasks">
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
    </PanelSectionWrapper>
  );
};

export default LastTasksSection;
