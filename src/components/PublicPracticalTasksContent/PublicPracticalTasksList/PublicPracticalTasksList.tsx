import { IFilteringTechnology, IPublicPracticalTask, ISupportedTechnology } from '@/types/tasksTypes';
import { SetURLSearchParams } from 'react-router-dom';
import FilterTechnologiesModal from '../../UI/FilterTechnologiesModal/FilterTechnologiesModal';
import { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import Spinner from '../../UI/Spinner/Spinner';
import PracticalTaskListItem from './PracticalTaskListItem';
import { PathSearchParams } from '@/constants/paths';

type PublicPracticalTasksListProps = {
  tasks: IPublicPracticalTask[];
  isFetching: boolean;
  technologies: string[];
  setSearchParams: SetURLSearchParams;
  supportedTechnologies: ISupportedTechnology[];
};

const PublicPracticalTasksList = ({
  tasks,
  isFetching,
  technologies,
  setSearchParams,
  supportedTechnologies,
}: PublicPracticalTasksListProps) => {
  const [technologyModal, setTechnologyModal] = useState(false);

  const allFields: IFilteringTechnology[] = supportedTechnologies.map((field) => {
    return {
      ...field,
      isPicked: technologies.includes(field.code.toLowerCase()),
    };
  });

  const pickedFields = allFields.filter((field) => field.isPicked);

  const handleUpdatePickedTechnologies = (technologies: string[]) => {
    if (technologies.length === 0) {
      setSearchParams((prevParams) => {
        prevParams.delete('technologies');
        prevParams.set(PathSearchParams.pageNumber, '1');
        return prevParams;
      });
      return;
    }
    setSearchParams((prevParams) => {
      prevParams.set('technologies', JSON.stringify(technologies.join(',')));
      prevParams.set(PathSearchParams.pageNumber, '1');
      return prevParams;
    });
  };

  return (
    <div className="flex flex-col gap-1 rounded-b-xl p-8 md:px-12 lg:px-16">
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
            <PracticalTaskListItem
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

export default PublicPracticalTasksList;
