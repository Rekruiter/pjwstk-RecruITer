import CompanyPracticalTasksContent from '@/components/CompanyPracticalTasksContent/CompanyPracticalTasksContent';
import CompanyTheoreticalTasksContent from '@/components/CompanyTheoreticalTasksContent/CompanyTheoreticalTasksContent';
import { PathSearchParams } from '@/constants/paths';
import { capitalizeFirstLetter } from '@/helpers';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const CompanyTasksPage = () => {
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

  return (
    <div className="container flex flex-1 flex-col gap-3 bg-light p-8">
      <h3 className="mb-4 text-2xl font-semibold text-dark">Company tasks</h3>
      <div className="flex w-full rounded-md bg-dark_blue px-2 sm:px-0">
        <TabElement category={categories[0]} />
        <TabElement category={categories[1]} />
      </div>
      {taskType === 'practical' ? <CompanyPracticalTasksContent /> : <CompanyTheoreticalTasksContent />}
    </div>
  );
};

export default CompanyTasksPage;
