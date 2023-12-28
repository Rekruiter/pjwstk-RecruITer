import { IFilteringTechnology, IPublicPracticalTask } from '@/types/publicTasksTypes';
import { SetURLSearchParams } from 'react-router-dom';
import FilterTechnologiesModal from '../UI/FilterTechnologiesModal/FilterTechnologiesModal';
import { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import Spinner from '../UI/Spinner/Spinner';
import TaskElement from './TaskElement/TaskElement';

const fields: Omit<IFilteringTechnology, 'isPicked'>[] = [
  {
    name: 'React',
  },
  {
    name: 'Javascript',
  },
  {
    name: 'Node',
  },
  {
    name: 'Vite',
  },
  {
    name: 'Angular',
  },
  {
    name: 'Vue',
  },
  {
    name: 'Svelte',
  },
  {
    name: 'Typescript',
  },
  {
    name: 'HTML',
  },
];

type PublicTasksContentProps = {
  tasks: IPublicPracticalTask[];
  isFetching: boolean;
  technologies: string[];
  setSearchParams: SetURLSearchParams;
};

const PublicTasksContent = ({ tasks, isFetching, technologies, setSearchParams }: PublicTasksContentProps) => {
  const [technologyModal, setTechnologyModal] = useState(false);

  const allFields: IFilteringTechnology[] = fields.map((field) => {
    return {
      ...field,
      isPicked: technologies.includes(field.name.toLowerCase()),
    };
  });

  const pickedFields = allFields.filter((field) => field.isPicked);

  const handleUpdatePickedTechnologies = (technologies: string[]) => {
    if (technologies.length === 0) {
      setSearchParams((prevParams) => {
        prevParams.delete('technologies');
        prevParams.set('page', '1');
        return prevParams;
      });
      return;
    }
    setSearchParams((prevParams) => {
      prevParams.set('technologies', JSON.stringify(technologies.join(',')));
      prevParams.set('page', '1');
      return prevParams;
    });
  };

  return (
    <div className="container flex flex-col gap-1 rounded-b-xl p-8 md:px-12 lg:px-16">
      <h3 className="mb-4 text-2xl font-semibold text-dark">Tasks section</h3>
      <div className="flex items-center gap-2 pb-4">
        <p>Filter by technology: </p>
        <div className="flex flex-wrap gap-2">
          {pickedFields.map((field) => (
            <p key={field.name} className="border border-dark p-1">
              {field.name}
            </p>
          ))}
        </div>
        <button onClick={() => setTechnologyModal(true)}>
          <CiEdit size={32} />
        </button>
        <FilterTechnologiesModal
          fields={allFields}
          handleCloseModal={() => setTechnologyModal(false)}
          isShown={technologyModal}
          handleUpdatePickedTechnologies={handleUpdatePickedTechnologies}
        />
      </div>
      <div className="flex w-full flex-col gap-2 rounded-md p-4">
        {isFetching ? (
          <Spinner />
        ) : (
          tasks.map((task) => (
            <TaskElement
              key={task.id}
              id={task.id}
              question={task.question}
              difficultyLevel={task.difficultyLevel}
              practicalTasksSolutions={task.practicalTaskSolutions}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PublicTasksContent;
