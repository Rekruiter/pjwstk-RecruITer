import { Link } from 'react-router-dom';
import { GetPathsLinks, Paths } from '../../constants/paths';
import { ICandidatePanel } from '../../types/panelPageTypes';
import { FaStar } from 'react-icons/fa';
import PanelSectionWrapper from '../UI/PanelSectionWrapper';
import { useState } from 'react';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';

interface LastTasksSectionProps {
  lastPracticalTasks: NonNullable<ICandidatePanel['lastPracticalTasks']>;
  lastTheoreticalTasks: NonNullable<ICandidatePanel['lastTheoreticalTasks']>;
}

const LastTasksSection = ({ lastPracticalTasks, lastTheoreticalTasks }: LastTasksSectionProps) => {
  const [tasksCategory, setTasksCategory] = useState<'practical' | 'theoretical'>('practical');

  const pickedTasks = tasksCategory === 'practical' ? lastPracticalTasks : lastTheoreticalTasks;

  return (
    <PanelSectionWrapper headerTitle="Last tasks">
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
      {pickedTasks.length === 0 && (
        <p className="m-auto text-light">
          Navigate to{' '}
          <Link to={Paths.tasks.path} className="text-orange underline underline-offset-2">
            Tasks
          </Link>{' '}
          section and start preparing yourself
        </p>
      )}
      {pickedTasks.map((task) => (
        <Link
          to={GetPathsLinks.getPracticalTaskSolve(task.id)}
          key={task.id}
          className="group flex w-full cursor-pointer flex-wrap rounded-md bg-light/5 p-2 text-light shadow-md hover:bg-orange">
          <div className="flex basis-full justify-between">
            <p className="line-clamp-2 overflow-hidden">{task.question}</p>
            {task.isCorrectlySolved ? (
              <AiOutlineCheckCircle className="text-green-500 group-hover:text-light" size={24} />
            ) : (
              <AiOutlineCloseCircle className="text-orange group-hover:text-light" size={24} />
            )}
          </div>
          <div className="inline-flex text-orange group-hover:text-light">
            {Array(task.difficultyLevel)
              .fill(0)
              .map((_, idx) => (
                <FaStar key={idx} />
              ))}
          </div>
        </Link>
      ))}
    </PanelSectionWrapper>
  );
};

export default LastTasksSection;
