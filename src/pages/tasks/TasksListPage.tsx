import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import PublicPracticalTasksContent from '@/components/PublicPracticalTasksContent/PublicPracticalTasksContent';
import PublicTheoreticalTasksContent from '@/components/PublicTheoreticalTasksContent/PublicTheoreticalTasksContent';
import { cn } from '@/lib/utils';
import { PathSearchParams } from '@/constants/paths';

const TasksListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const taskType = searchParams.get(PathSearchParams.taskType);

  const categories = ['practical', 'theoretical'] as const;

  useEffect(() => {
    if (!taskType) {
      setSearchParams((prevParams) => {
        prevParams.set(PathSearchParams.taskType, 'practical');
        return prevParams;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (taskType !== 'practical' && taskType !== 'theoretical') {
    return null;
  }

  const TabElement = ({ category }: { category: string }) => (
    <div
      className={cn('basis-1/2 rounded-sm p-1', {
        '': taskType === category,
      })}>
      <button
        onClick={() => {
          if (taskType === category) {
            return;
          }
          setSearchParams(
            new URLSearchParams({
              page: '1',
              taskType: category,
            }),
          );
        }}
        className={cn('w-full rounded-sm p-2 text-light/70 shadow-md', {
          'bg-light/20 text-light': taskType === category,
        })}>
        {capitalizeFirstLetter(category)}
      </button>
    </div>
  );

  const capitalizeFirstLetter = (element: string) => element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();

  return (
    <div className="container flex flex-grow flex-col gap-2 bg-light p-6">
      <div className="flex w-full rounded-md bg-dark_blue px-2 sm:px-0">
        <TabElement category={categories[0]} />
        <TabElement category={categories[1]} />
      </div>
      {taskType === 'practical' ? <PublicPracticalTasksContent /> : <PublicTheoreticalTasksContent />}
    </div>
  );
};

export default TasksListPage;
