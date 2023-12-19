import { Link, useNavigate } from 'react-router-dom';
import { Paths } from '../../constants/paths';
import { ICandidatePanel } from '../../types/panelPageTypes';
import { FaStar } from 'react-icons/fa';
import PanelSectionWrapper from '../UI/PanelSectionWrapper';
import { useState } from 'react';

interface LastTasksSectionProps {
  lastPracticalTasks: NonNullable<ICandidatePanel['lastPracticalTasks']>;
  lastTheoreticalTasks: NonNullable<ICandidatePanel['lastTheoreticalTasks']>;
}

const LastTasksSection = ({ lastPracticalTasks, lastTheoreticalTasks }: LastTasksSectionProps) => {
  const [tasksCategory, setTasksCategory] = useState<'practical' | 'theoretical'>('practical');
  const navigate = useNavigate();

  const pickedTasks =
    tasksCategory === 'practical'
      ? lastPracticalTasks
      : lastTheoreticalTasks.map((task) => ({
          ...task,
          compilationLanguage: null,
        }));

  return (
    <PanelSectionWrapper headerClickHandler={() => navigate(Paths.tasks.path)} headerTitle="Last tasks">
      {pickedTasks.length === 0 ? (
        <p className="m-auto text-light">
          Navigate to{' '}
          <Link to={Paths.tasks.path} className="text-orange underline underline-offset-2">
            Tasks
          </Link>{' '}
          section and start preparing yourself
        </p>
      ) : (
        <div className="my-2 flex justify-around">
          <button
            className={`text-light underline-offset-4 hover:scale-105 ${
              tasksCategory === 'practical' ? 'underline' : ''
            }`}
            onClick={() => setTasksCategory('practical')}>
            Practical tasks
          </button>
          <button
            className={`text-light underline-offset-4 hover:scale-105 ${
              tasksCategory === 'theoretical' ? 'underline' : ''
            }`}
            onClick={() => setTasksCategory('theoretical')}>
            Theoretical tasks
          </button>
        </div>
      )}
      {pickedTasks.map((task) => (
        <div
          key={task.id}
          className="flex w-full cursor-pointer flex-wrap bg-light/5 p-2 text-light shadow-md hover:bg-orange"
          onClick={() => {
            // navigate to task
          }}>
          <div className="basis-full">
            <p className="line-clamp-2 overflow-hidden">{task.question}</p>
          </div>
          <p className="md:text-cener basis-1/4 text-sm">{}</p>
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
