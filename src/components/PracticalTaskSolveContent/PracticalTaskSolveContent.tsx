import { IPublicPracticalTask } from '@/types/tasksTypes';
import { useContext, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import Button from '../UI/Button';
import { useMutation } from 'react-query';
import { solvePublicPracticalTaskPost } from '@/api/tasks/publicTasks';
import Spinner from '../UI/Spinner/Spinner';
import IError from '@/api/Error/Error';
import { toast } from 'react-toastify';
import { IoMdArrowBack } from 'react-icons/io';
import PracticalTaskSolutions from './PracticalTaskSolutions/PracticalTaskSolutions';
import { useNavigate } from 'react-router-dom';
import { GetPathsLinks } from '@/constants/paths';
import AuthContext from '@/context/auth-context';

interface PracticalTaskSolveContentProps {
  task: IPublicPracticalTask;
}

const PracticalTaskSolveContent = ({ task }: PracticalTaskSolveContentProps) => {
  const { role } = useContext(AuthContext);
  const isCompanyRole = role === 'admin' || role === 'candidate' || role === 'techRecruiter';
  const [isHintShown, setIsHintShown] = useState(isCompanyRole);
  const [solutionInput, setSolutionInput] = useState('');
  const [showSolutions, setShowSolutions] = useState(isCompanyRole);

  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation<
    {
      isSolutionCorrect: boolean;
    },
    IError,
    { id: number; solution: string }
  >(['solveTask', task.id], solvePublicPracticalTaskPost, {
    onError(error) {
      toast.error(error.message);
      setShowSolutions(true);
    },
    onSuccess(data) {
      if (!data.isSolutionCorrect) {
        toast.success('Correct answer');
        navigate(GetPathsLinks.getPracticalTasksList());
      } else {
        toast.error('Wrong answer');
      }
      setShowSolutions(true);
    },
  });

  const handleSolveTask = () => {
    if (isLoading || solutionInput.trim().length === 0 || isCompanyRole) return;
    mutate({
      id: task.id,
      solution: solutionInput,
    });
  };

  return (
    <div className="container flex flex-col gap-5 rounded-b-xl p-8 md:px-12 lg:px-16">
      <div className="mb-4 flex items-center gap-2">
        <button onClick={() => navigate(-1)}>
          <IoMdArrowBack className="text-dark" size={24} />
        </button>
        <h3 className="text-2xl font-semibold text-dark">Task solving</h3>
      </div>
      <h4 className="text-base font-semibold text-dark">{task.question}</h4>
      <div className="flex items-center gap-3">
        <div className="inline-flex text-orange">
          {Array(task.difficultyLevel)
            .fill(0)
            .map((_, idx) => (
              <FaStar key={idx} />
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
      {!isCompanyRole && (
        <>
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
        </>
      )}

      {showSolutions && <PracticalTaskSolutions solutions={task.practicalTaskSolutions} />}
    </div>
  );
};

export default PracticalTaskSolveContent;
