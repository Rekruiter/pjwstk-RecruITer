import IError from '@/api/Error/Error';
import { solvePublicTheoreticalTaskPost } from '@/api/tasks/publicTasks';
import { GetPathsLinks } from '@/constants/paths';
import { IPublicTheoreticalTask } from '@/types/tasksTypes';
import { useContext, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { IoMdArrowBack } from 'react-icons/io';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../UI/Button';
import Spinner from '../UI/Spinner/Spinner';
import AuthContext from '@/context/auth-context';

interface TheoreticalTaskSolveContentProps {
  task: IPublicTheoreticalTask;
}

const TheoreticalTaskSolveContent = ({ task }: TheoreticalTaskSolveContentProps) => {
  const { role } = useContext(AuthContext);
  const isCompanyRole = role === 'admin' || role === 'recruiter' || role === 'techRecruiter';
  const [isHintShown, setIsHintShown] = useState(isCompanyRole);
  const navigate = useNavigate();

  const options: string[] = [task.optionA, task.optionB, task.optionC, task.optionD].filter(
    (opt): opt is string => !!opt,
  );

  const { mutateAsync, isLoading } = useMutation<
    {
      isSolutionCorrect: boolean;
    },
    IError,
    { id: number; answer: number }
  >(['solveTask', task.id], solvePublicTheoreticalTaskPost);

  const handleSolveTask = async (answer: number) => {
    if (isLoading) return;

    try {
      const response = await mutateAsync({
        id: task.id,
        answer: answer,
      });
      //TODO: DO it in non async way using onError and onSuccess
      if (response.isSolutionCorrect) {
        toast.success('Correct answer');
        navigate(GetPathsLinks.getTheoreticalTasksList());
      } else {
        toast.error('Wrong answer');
      }
    } catch (error: any) {
      if (error instanceof IError) {
        toast.error(error.message);
      }
    }
  };

  const AnswerButton = ({ answer, index }: { answer: string; index: number }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
      if (isCompanyRole) {
        return;
      }
      setIsSubmitting(true);
      await handleSolveTask(index + 1);
      setIsSubmitting(false);
    };

    return (
      <div className="flex basis-1/2 justify-center p-2">
        <Button
          onClick={handleSubmit}
          disabled={isLoading || isCompanyRole}
          className="min-w-[200px] disabled:opacity-80">
          {isSubmitting ? <Spinner isLight className="h-4 w-4 border-2" /> : answer}
        </Button>
      </div>
    );
  };

  const getAnswer = (index: number) => {
    switch (index) {
      case 1:
        return task.optionA;
      case 2:
        return task.optionB;
      case 3:
        return task.optionC;
      case 4:
        return task.optionD;
    }
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
      {task.answer && <p className="text-dark">Answer: {getAnswer(task.answer)}</p>}
      {!isCompanyRole && <p className="mt-10 text-dark">Your solution</p>}
      <div className="flex flex-wrap">
        {options.map((answer, idx) => (
          <AnswerButton key={idx} answer={answer} index={idx} />
        ))}
      </div>
    </div>
  );
};

export default TheoreticalTaskSolveContent;
