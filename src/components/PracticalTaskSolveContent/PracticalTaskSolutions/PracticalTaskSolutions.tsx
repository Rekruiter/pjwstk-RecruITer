import { IPublicPracticalTask } from '@/types/publicTasksTypes';
import { Listbox, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { LuChevronsUpDown } from 'react-icons/lu';
import { FaCheck } from 'react-icons/fa';
import PracticalTaskSolutionsTabs from './PracticalTaskSolutionsTabs';

interface PracticalTaskSolutionsProps {
  solutions: IPublicPracticalTask['practicalTaskSolutions'];
}

const PracticalTaskSolutions = ({ solutions }: PracticalTaskSolutionsProps) => {
  const [selected, setSelected] = useState<IPublicPracticalTask['practicalTaskSolutions'][number] | null>(solutions[0]);

  if (solutions.length === 0) {
    return <p className="mx-auto mt-5 text-dark">There are no solutions for this exercise</p>;
  }

  return (
    <div className="mt-5 flex w-full flex-col gap-3">
      <h4 className="text-dark">See proposed solutions</h4>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 sm:text-sm">
            <span className="block truncate">{selected?.compilationLanguage}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <LuChevronsUpDown />
            </span>
          </Listbox.Button>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className="absolute mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {solutions.map((solution) => (
                <Listbox.Option
                  key={solution.compilationLanguage}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-orange text-light' : 'text-gray-900'
                    }`
                  }
                  value={solution}>
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                        {solution.compilationLanguage}
                      </span>
                      {selected ? (
                        <span className={`absolute inset-y-0 left-0 flex items-center pl-3`}>
                          <FaCheck />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      {selected && <PracticalTaskSolutionsTabs selected={selected} />}
    </div>
  );
};

export default PracticalTaskSolutions;
