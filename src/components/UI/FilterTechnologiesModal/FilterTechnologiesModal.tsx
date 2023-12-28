import { IFilteringTechnology } from '@/types/publicTasksTypes';
import { Transition, Dialog } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import Button from '../Button';
import { AiOutlineCheck } from 'react-icons/ai';

interface FilterTechnologiesModalProps {
  isShown: boolean;
  handleCloseModal: () => void;
  fields: IFilteringTechnology[];
  handleUpdatePickedTechnologies: (newTechnologies: string[]) => void;
}

const FilterTechnologiesModal = ({
  fields,
  handleCloseModal,
  isShown,
  handleUpdatePickedTechnologies,
}: FilterTechnologiesModalProps) => {
  const [technologySearch, setTechnologySearch] = useState<string>('');
  const [pickedTechnologies, setPickedTechnologies] = useState<IFilteringTechnology[]>(fields);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const filteredTechnologies = pickedTechnologies
    .filter((field) => field.name.toLowerCase().includes(technologySearch?.toLowerCase() ?? ''))
    .sort((a) => (a.isPicked ? -1 : 1));

  // Preventing auto scroll to top when picking technology
  useEffect(() => {
    const currentScrollRef = scrollRef.current;
    if (currentScrollRef) {
      currentScrollRef.scrollTop = scrollPosition;
    }
  }, [scrollPosition, pickedTechnologies]);

  const handleToggleTechnology = (technologyName: string) => {
    setTechnologySearch('');
    setScrollPosition(scrollRef.current?.scrollTop ?? 0);
    setPickedTechnologies((prevTechnologies) => {
      return prevTechnologies.map((technology) => {
        if (technology.name === technologyName) {
          return {
            ...technology,
            isPicked: !technology.isPicked,
          };
        }
        return technology;
      });
    });
  };

  const handleUpdateTechnologies = () => {
    setTechnologySearch('');
    handleUpdatePickedTechnologies(
      pickedTechnologies.filter((technology) => technology.isPicked).map((technology) => technology.name),
    );
    handleCloseModal();
  };

  const onClose = () => {
    setPickedTechnologies(fields);
    handleCloseModal();
  };

  return (
    <Transition show={isShown} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Technologies
                </Dialog.Title>
                <div className="mt-5 flex flex-col gap-5">
                  <input
                    className="w-full rounded-md border border-dark p-1"
                    value={technologySearch}
                    onChange={(e) => setTechnologySearch(e.target.value)}
                    placeholder="Search for technology"
                  />
                  <div
                    className="flex max-h-[300px] min-h-[300px] flex-col gap-5 overflow-scroll text-dark"
                    ref={scrollRef}>
                    {filteredTechnologies.map((technology) => (
                      <button
                        key={technology.name}
                        className="flex justify-between rounded-md p-1 text-start hover:bg-orange hover:text-white"
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleTechnology(technology.name);
                        }}>
                        {technology.name}
                        {technology.isPicked && <AiOutlineCheck />}
                      </button>
                    ))}
                  </div>
                  <Button onClick={handleUpdateTechnologies}>Show results</Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default FilterTechnologiesModal;
