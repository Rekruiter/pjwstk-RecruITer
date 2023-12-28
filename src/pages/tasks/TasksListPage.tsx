import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import PublicPracticalTasksContent from '@/components/PublicPracticalTasksContent/PublicPracticalTasksContent';
import PublicTheoreticalTasksContent from '@/components/PublicTheoreticalTasksContent/PublicTheoreticalTasksContent';
import { cn } from '@/lib/utils';

const TasksListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const taskType = searchParams.get('taskType');

  const categories = ['practical', 'theoretical'] as const;

  useEffect(() => {
    if (!taskType) {
      setSearchParams((prevParams) => {
        prevParams.set('taskType', 'practical');
        return prevParams;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (taskType !== 'practical' && taskType !== 'theoretical') {
    return null;
  }

  return (
    <div className="container flex flex-grow flex-col gap-2 bg-light p-6">
      <div className="flex w-full rounded-md bg-dark/5 px-2 sm:px-0">
        <div
          className={cn('basis-1/2 rounded-md p-2', {
            '': taskType === categories[0],
          })}>
          <button
            className={cn('w-full rounded-md p-2 text-dark shadow-sm', {
              'bg-light text-orange': taskType === categories[0],
            })}>
            {categories[0]}
          </button>
        </div>
        <button className="basis-1/2">{categories[1]}</button>
      </div>
      {taskType === 'practical' ? <PublicPracticalTasksContent /> : <PublicTheoreticalTasksContent />}
    </div>
  );
};

export default TasksListPage;
