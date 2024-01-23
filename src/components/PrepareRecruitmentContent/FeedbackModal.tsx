import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Button from '../UI/Button';
import Spinner from '../UI/Spinner/Spinner';
import { IRecruitmentFeedback, RecruitmentFeedbackFormSchema } from '@/types/recruitmentsTypes';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface FeedbackModalProps {
  isLoading: boolean;
  handleSendFeedback: (data: IRecruitmentFeedback) => void;
  handleCloseModal?: () => void;
  showSkipButton?: () => void;
}

const FeedbackModal = ({ isLoading, handleCloseModal, handleSendFeedback, showSkipButton }: FeedbackModalProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IRecruitmentFeedback>({
    resolver: zodResolver(RecruitmentFeedbackFormSchema),
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    handleSubmit(
      async (data) => {
        handleSendFeedback(data);
      },
      (e) => {
        console.log(e);
      },
    )();
  };

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleCloseModal ? handleCloseModal : () => {}}>
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
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-center text-lg font-medium leading-6 text-dark">
                  Send feedback
                </Dialog.Title>
                <form onSubmit={onSubmit} className="flex flex-col gap-2">
                  <div className="flex w-full flex-col gap-2">
                    <label className="font-semibold text-dark">Feedback</label>
                    <textarea
                      {...register('feedback')}
                      className={`h-32 w-full rounded border-2 bg-white px-2 py-2 text-base ${
                        errors.feedback ? 'border-error_color' : 'border-light'
                      }`}
                      autoComplete="off"
                      placeholder="Your feedback to candidate..."
                      minLength={5}
                      maxLength={500}
                    />
                    {errors.feedback && <div className="text-error_color">{errors.feedback.message}</div>}
                  </div>
                  <Button type="submit" disabled={isLoading} className="disabled:opacity-70">
                    {isLoading ? <Spinner isLight className="h-6 w-6 border-2" /> : 'Send feedback'}
                  </Button>
                  {showSkipButton && (
                    <button type="button" onClick={showSkipButton} className="text-dark underline">
                      Do it later
                    </button>
                  )}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default FeedbackModal;
