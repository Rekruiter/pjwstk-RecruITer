import { cn } from '@/lib/utils';
import { IPublicPracticalTask } from '@/types/tasksTypes';
import { Tab } from '@headlessui/react';

interface PracticalTaskSolutionsTabsProps {
  selected: IPublicPracticalTask['practicalTaskSolutions'][number];
}

const PracticalTaskSolutionsTabs = ({ selected }: PracticalTaskSolutionsTabsProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { compilationLanguage, ...categories } = selected;

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'bruteForceSolution':
        return 'Brute Force Solution';
      case 'mediumSolution':
        return 'Medium Solution';
      case 'bestSolution':
        return 'Best Solution';
    }
  };

  return (
    <div className="w-full px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-md bg-blue-900/20 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                cn(
                  'w-full rounded-md bg-light py-2.5 text-sm font-medium leading-5',
                  selected
                    ? 'bg-light text-orange shadow-sm'
                    : 'bg-dark/5 text-light hover:bg-white/[0.12] hover:text-white',
                )
              }>
              {getCategoryName(category)}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((categoryData, idx) => (
            <Tab.Panel key={idx} className={cn('rounded-md p-3', 'shadow-m bg-dark/5')}>
              {categoryData ? (
                <textarea className="w-full text-dark" disabled rows={categoryData.split('\n').length}>
                  {categoryData}
                </textarea>
              ) : (
                <p className="w-full text-dark">There is no {getCategoryName(Object.keys(categories)[idx])}</p>
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default PracticalTaskSolutionsTabs;
