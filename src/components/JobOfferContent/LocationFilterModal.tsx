import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';
import { IoClose, IoAddSharp } from 'react-icons/io5';
import { FaDeleteLeft } from 'react-icons/fa6';

interface LocationFilterModalProps {
  handleCloseModal: () => void;
  pickedLocations: string[];
  pickedIsRemote: boolean;
  handleUpdateLocation: (locations: string[], isRemote: boolean) => void;
}

const LocationFilterModal = ({
  handleCloseModal,
  pickedLocations,
  pickedIsRemote,
  handleUpdateLocation,
}: LocationFilterModalProps) => {
  const [locations, setLocations] = useState(pickedLocations);

  const newLocationRef = useRef<HTMLInputElement>(null);

  const handleAddLocation = () => {
    if (newLocationRef.current === null) {
      return;
    }
    const newLocation = newLocationRef.current.value.trim();
    if (!newLocation) {
      return;
    }
    setLocations((prevLocations) => [...new Set([...prevLocations, newLocation])]);
    newLocationRef.current.value = '';
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let newLocations = locations;
    if (newLocationRef.current !== null && newLocationRef.current.value.trim()) {
      newLocations = [...new Set([...newLocations, newLocationRef.current.value.trim()])];
    }
    handleUpdateLocation(newLocations, e.currentTarget.isRemote.checked);
  };

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleCloseModal}>
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
              <Dialog.Panel className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                <button className="absolute right-3 top-3" onClick={handleCloseModal}>
                  <IoClose />
                </button>
                <Dialog.Title as="h3" className="text-center text-lg font-medium leading-6 text-gray-900">
                  Location
                </Dialog.Title>
                <div className="mt-5 flex flex-wrap gap-4">
                  {locations.map((location, idx) => (
                    <div key={idx} className="flex gap-1 text-sm text-dark">
                      <p>{location}</p>
                      <button
                        onClick={() =>
                          setLocations((prevLocations) => prevLocations.filter((loc) => loc !== location))
                        }>
                        <FaDeleteLeft />
                      </button>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleFormSubmit} className="mt-5 flex flex-col gap-10">
                  <div className="flex gap-2">
                    <input
                      className="w-full rounded border-2 bg-white px-2 py-2 text-base"
                      placeholder="eg. Warsaw"
                      ref={newLocationRef}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddLocation();
                        }
                      }}
                    />
                    <button type="button" className="text-dark" onClick={handleAddLocation}>
                      <IoAddSharp size={24} />
                    </button>
                  </div>

                  <div className="flex justify-between">
                    <div className="flex items-center gap-2 text-sm ">
                      <p>Show remote</p>
                      <input id="isRemote" type="checkbox" className="h-4 w-4" defaultChecked={pickedIsRemote} />
                    </div>
                    <button
                      type="submit"
                      className="w-fit place-self-end rounded-md bg-light_blue px-3 py-1 text-dark shadow-md">
                      Show results
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default LocationFilterModal;
