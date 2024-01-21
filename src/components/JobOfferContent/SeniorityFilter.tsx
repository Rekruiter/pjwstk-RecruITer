import { PathSearchParams } from '@/constants/paths';
import { capitalizeFirstLetter } from '@/helpers';
import { cn } from '@/lib/utils';
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { SetURLSearchParams } from 'react-router-dom';

interface SeniorityFilterProps {
  pickedSeniorities: string[];
  setSearchParams: SetURLSearchParams;
}

const SeniorityFilter = ({ pickedSeniorities, setSearchParams }: SeniorityFilterProps) => {
  const [seniorities, setSeniorities] = useState({
    intern: pickedSeniorities.includes('intern'),
    junior: pickedSeniorities.includes('junior'),
    mid: pickedSeniorities.includes('mid'),
    senior: pickedSeniorities.includes('senior'),
  });

  const handleUpdateSeniority = () => {
    const pickedSeniorities = Object.entries(seniorities)
      .filter(([, value]) => value)
      .map(([key]) => key);

    setSearchParams((prevParams) => {
      prevParams.set(PathSearchParams.seniorities, JSON.stringify(pickedSeniorities.join(',')));
      prevParams.set(PathSearchParams.pageNumber, '1');
      return prevParams;
    });
  };

  const handleClearSeniority = () => {
    setSearchParams((prevParams) => {
      prevParams.delete(PathSearchParams.seniorities);
      prevParams.set(PathSearchParams.pageNumber, '1');
      return prevParams;
    });
    setSeniorities({
      intern: false,
      junior: false,
      mid: false,
      senior: false,
    });
  };

  const changeHandler = (field: keyof typeof seniorities) => {
    setSeniorities((prev) => {
      return {
        ...prev,
        [field]: !prev[field],
      };
    });
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button className={`bg-darken min-w-[5rem] max-w-[20rem] rounded-full border px-4 py-1`}>
        {({ open }) => (
          <div className="flex items-center gap-2">
            <p className="break-all">Seniority</p>
            <div>{open ? <MdArrowDropUp size={20} /> : <MdArrowDropDown size={20} />}</div>
          </div>
        )}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items className="absolute right-0 mt-6 w-[200%] origin-top divide-y divide-gray-100 rounded-md bg-dark_blue">
          <div className="flex flex-col gap-2 p-3">
            <div
              className="flex cursor-pointer items-center gap-2 rounded-md bg-light p-2"
              onClick={() => {
                changeHandler('intern');
              }}>
              <input type="checkbox" className="h-4 w-4" checked={seniorities.intern} onChange={() => {}} />
              <p className="text-dark">Intern</p>
            </div>
            <div
              className="flex cursor-pointer items-center gap-2 rounded-md bg-light p-2"
              onClick={() => changeHandler('junior')}>
              <input type="checkbox" className="h-4 w-4" checked={seniorities.junior} onChange={() => {}} />
              <p className="text-dark">Junior</p>
            </div>
            <div
              className="flex cursor-pointer items-center gap-2 rounded-md bg-light p-2"
              onClick={() => changeHandler('mid')}>
              <input type="checkbox" className="h-4 w-4" checked={seniorities.mid} onChange={() => {}} />
              <p className="text-dark">Mid</p>
            </div>
            <div
              className="flex cursor-pointer items-center gap-2 rounded-md bg-light p-2"
              onClick={() => changeHandler('senior')}>
              <input type="checkbox" className="h-4 w-4" checked={seniorities.senior} onChange={() => {}} />
              <p className="text-dark">Senior</p>
            </div>

            <Menu.Item as={'div'} className="mt-2 flex justify-center">
              {({ active }) => (
                <button
                  onClick={handleUpdateSeniority}
                  className={cn('w-fit place-self-end rounded-md bg-light/20 px-3 py-1 text-sm text-light shadow-md', {
                    'bg-orange': active,
                  })}>
                  Show results
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
      <div className="mt-2 flex gap-2">
        <div className="flex flex-wrap gap-2">
          {pickedSeniorities.map((seniority, idx) => (
            <p key={idx} className="text-sm text-light_blue">
              {capitalizeFirstLetter(seniority)}
            </p>
          ))}
        </div>
        {pickedSeniorities.length !== 0 && (
          <button onClick={handleClearSeniority} className="text-light_blue">
            <IoClose />
          </button>
        )}
      </div>
    </Menu>
  );
};

export default SeniorityFilter;
