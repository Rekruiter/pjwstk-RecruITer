import { Transition, Dialog } from '@headlessui/react';
import { Fragment } from 'react';
import Button from '../UI/Button';

interface RequiredSignUpModalProps {
  handleCloseModal: () => void;
  handleOpenRegisterModal: () => void;
}

const RequiredSignUpModal = ({ handleCloseModal, handleOpenRegisterModal }: RequiredSignUpModalProps) => {
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
              <Dialog.Panel className="flex w-full max-w-xl transform flex-col items-start gap-3 overflow-hidden rounded-2xl bg-light p-8 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-dark">
                  To access this resource you need to be logged in
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Only logged users have acccess to tasks section. Don't wait and join us!
                  </p>
                </div>
                <div className="flex">
                  <Button
                    onClick={() => {
                      handleCloseModal();
                      handleOpenRegisterModal();
                    }}>
                    Create an account
                  </Button>
                  <button
                    className="inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium text-dark hover:underline"
                    onClick={handleCloseModal}>
                    Continue browsing
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default RequiredSignUpModal;
