import { deletePracticalTask } from '@/api/tasks/companyTasks';
import PracticalTaskListItem from '@/components/PublicPracticalTasksContent/PublicPracticalTasksList/PracticalTaskListItem';
import Button from '@/components/UI/Button';
import ConfirmModal from '@/components/UI/ConfirmModal/ConfirmModal';
import Spinner from '@/components/UI/Spinner/Spinner';
import { defaultStyles } from '@/constants/defaultStyles';
import { GetPathsLinks, Paths } from '@/constants/paths';
import { cn } from '@/lib/utils';
import { IPublicPracticalTask } from '@/types/tasksTypes';
import { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

interface CompanyPracticalTasksListProps {
  tasks: IPublicPracticalTask[];
  isFetching: boolean;
  currPage: number;
}

const CompanyPracticalTasksList = ({ isFetching, tasks, currPage }: CompanyPracticalTasksListProps) => {
  const queryClient = useQueryClient();
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState<number | null>(null);
  const { isLoading, mutate } = useMutation('deletePracticalTask', deletePracticalTask, {
    onSuccess: () => {
      toast.success('Task deleted successfully');
      queryClient.refetchQueries(`companyPracticalTasks-${currPage}`);
      setShowConfirmDeleteModal(null);
    },
    onError: () => {
      toast.error('An error occured, please try again later');
    },
  });

  const handleRemoveTask = () => {
    if (!showConfirmDeleteModal || isLoading) {
      return;
    }
    mutate(showConfirmDeleteModal);
  };

  return (
    <div className="flex flex-col gap-1 rounded-b-xl p-8 md:px-12 lg:px-16">
      <Link to={Paths.addPracticalTask.path} className={cn(defaultStyles.orangeButton, 'w-fit place-self-center')}>
        Add practical task
      </Link>
      <h3 className="mb-4 text-2xl font-semibold text-dark">Your tasks</h3>
      <div className="flex w-full flex-col gap-2 rounded-md p-4">
        {isFetching ? (
          <Spinner />
        ) : (
          tasks.map((task) => (
            <div className="flex gap-1" key={task.id}>
              <PracticalTaskListItem
                question={task.question}
                difficultyLevel={task.difficultyLevel}
                practicalTasksSolutions={task.practicalTaskSolutions}
                to={GetPathsLinks.getPracticalTaskSolve(task.id)}
                className="basis-11/12"
              />
              <div className="flex justify-between gap-2">
                <Link
                  to={GetPathsLinks.getPracticalTaskEdit(task.id)}
                  className="flex items-center justify-center hover:scale-110">
                  <CiEdit size={32} />
                </Link>
                <button className="hover:scale-110" onClick={() => setShowConfirmDeleteModal(task.id)}>
                  <MdDeleteOutline size={28} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {showConfirmDeleteModal && (
        <ConfirmModal
          title={`Are you sure you want to delete this task?`}
          handleCloseModal={() => setShowConfirmDeleteModal(null)}>
          <div className="flex flex-col">
            <p className="px-5 text-sm text-dark">
              {tasks.find((task) => task.id === showConfirmDeleteModal)?.question}
            </p>
            <div className="mt-10 flex justify-center gap-5">
              <Button className="bg-success_color" disabled={isLoading} onClick={handleRemoveTask}>
                {isLoading ? <Spinner isLight className="h-6 w-6 border-4" /> : 'Confirm'}
              </Button>
              <Button className="bg-error_color" onClick={() => setShowConfirmDeleteModal(null)}>
                Cancel
              </Button>
            </div>
          </div>
        </ConfirmModal>
      )}
    </div>
  );
};

export default CompanyPracticalTasksList;
