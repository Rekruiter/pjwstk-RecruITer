import { IPublicPracticalTask } from '@/types/publicTasksTypes';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import Button from '../UI/Button';
import { useMutation } from 'react-query';
import { solvePublicPracticalTaskPost } from '@/api/tasks/publicTasks';
import Spinner from '../UI/Spinner/Spinner';
import IError from '@/api/Error/Error';
import { toast } from 'react-toastify';
import PracticalTaskSolutions from './PracticalTaskSolutions/PracticalTaskSolutions';

interface PracticalTaskSolveContentProps {
  task: IPublicPracticalTask;
}

const PracticalTaskSolveContent = ({ task }: PracticalTaskSolveContentProps) => {
  const [isHintShown, setIsHintShown] = useState(false);
  const [solutionInput, setSolutionInput] = useState('');
  const [showSolutions, setShowSolutions] = useState(false);

  const { mutate, isLoading } = useMutation<
    {
      isCorrectAnswer: boolean;
    },
    IError,
    { id: number; solution: string }
  >(['solveTask', task.id], solvePublicPracticalTaskPost, {
    onError(error) {
      toast.error(error.message);
      setShowSolutions(true);
    },
    onSuccess(data) {
      if (data.isCorrectAnswer) {
        toast.success('Correct answer');
      } else {
        toast.error('Wrong answer');
      }
      setShowSolutions(true);
    },
  });

  const handleSolveTask = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (isLoading || solutionInput.trim().length === 0) return;
    mutate({
      id: task.id,
      solution: '',
    });
  };

  return (
    <div className="container flex flex-col gap-5 rounded-b-xl p-8 md:px-12 lg:px-16">
      <h3 className="mb-4 text-2xl font-semibold text-dark">Task solving</h3>
      <h4 className="text-base font-semibold text-dark">{task.question}</h4>
      <div className="flex items-center gap-3">
        <div className="inline-flex text-orange">
          {Array(task.difficultyLevel)
            .fill(0)
            .map(() => (
              <FaStar />
            ))}
        </div>
        <p className="place-self-start rounded-sm border bg-dark/5 p-0.5 shadow-sm">{task.tag}</p>
      </div>
      {task.hint &&
        (isHintShown ? (
          <p className="text-dark">{task.hint}</p>
        ) : (
          <Button onClick={() => setIsHintShown(true)} className="place-self-start rounded-md px-2 py-1 text-xs">
            Show hint
          </Button>
        ))}
      {task.codeRelatedToQuestion && (
        <div className="min-h-[40px] w-full rounded-sm bg-dark/5 p-2 text-dark shadow-sm">
          {task.codeRelatedToQuestion}
        </div>
      )}
      {task.input && <p className="text-dark">Input : {task.input}</p>}

      <p className="mt-10 text-dark">Your solution</p>
      <div className="flex flex-wrap gap-5">
        <input
          className="w-fit rounded-sm bg-dark/10 p-2 text-dark shadow-md"
          value={solutionInput}
          onChange={(e) => setSolutionInput(e.currentTarget.value)}
        />
        <Button
          onClick={handleSolveTask}
          disabled={solutionInput.trim().length === 0 || isLoading}
          className="min-w-[120px] disabled:opacity-80">
          {isLoading ? <Spinner isLight className="h-4 w-4 border-2" /> : 'Submit'}
        </Button>
      </div>
      {showSolutions && <PracticalTaskSolutions solutions={task.practicalTaskSolutions} />}
    </div>
  );
};

export default PracticalTaskSolveContent;
