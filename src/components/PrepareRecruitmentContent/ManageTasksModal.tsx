import { getPrivatePracticalTasks, getPrivateTheoreticalTasks } from '@/api/tasks/companyTasks';
import { getPublicPracticalTasks, getPublicTheoreticalTasks } from '@/api/tasks/publicTasks';
import { capitalizeFirstLetter } from '@/helpers';
import { cn } from '@/lib/utils';
import {
  IManageTasksForRecruitment,
  IRecruiterRecruitment,
  ManageTasksForRecruitmentSchema,
} from '@/types/recruitmentsTypes';
import { Dialog, Transition } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Fragment, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { FaDeleteLeft } from 'react-icons/fa6';
import { useMutation, useQueries, useQueryClient } from 'react-query';
import { IoIosAdd } from 'react-icons/io';
import Spinner from '../UI/Spinner/Spinner';
import PaginationFooter from '../UI/PaginationFooter/PaginationFooter';
import Button from '../UI/Button';
import { updateRecruitmentTasks } from '@/api/recruitments/recruitments';
import { toast } from 'react-toastify';

interface ManageTasksModalProps {
  recruitmentId: number;
  handleCloseModal: () => void;
  defaultPracticalTasks: IRecruiterRecruitment['practicalTasks'];
  defaultTheoreticalTasks: IRecruiterRecruitment['theoreticalTasks'];
}

const ManageTasksModal = ({
  handleCloseModal,
  recruitmentId,
  defaultPracticalTasks,
  defaultTheoreticalTasks,
}: ManageTasksModalProps) => {
  const [pickedTab, setPickedTab] = useState<'practical' | 'theoretical'>('practical');

  const TabElement = ({ tabName }: { tabName: 'theoretical' | 'practical' }) => (
    <div
      className={cn('basis-1/2 rounded-sm p-1', {
        '': pickedTab === tabName,
      })}>
      <button
        onClick={() => {
          setPickedTab(tabName);
        }}
        className={cn('w-full rounded-sm bg-dark/5 p-2 text-dark shadow-sm', {
          'bg-dark/10 font-semibold text-orange shadow-md': pickedTab === tabName,
        })}>
        {capitalizeFirstLetter(tabName)} Tasks
      </button>
    </div>
  );

  const practicalTasks = defaultPracticalTasks.map((task) => {
    return {
      idTask: task.id,
      question: task.question,
    };
  });
  const theoreitcalTasks = defaultTheoreticalTasks.map((task) => {
    return {
      idTask: task.id,
      question: task.question,
    };
  });

  const [companyTaskPage, setCompanyTaskPage] = useState(1);
  const [publicTaskPage, setPublicTaskPage] = useState(1);

  const [
    { data: companyTasks, isLoading: companyTasksLoading, isError: companyTasksError },
    { data: publicTasks, isLoading: publicTasksLoading, isError: publicTasksError },
  ] = useQueries([
    {
      queryKey: ['companyTask', pickedTab, companyTaskPage],
      queryFn:
        pickedTab === 'practical'
          ? () => getPrivatePracticalTasks(companyTaskPage)
          : () => getPrivateTheoreticalTasks(companyTaskPage),
    },
    {
      queryKey: ['publicTask', pickedTab, publicTaskPage],
      queryFn:
        pickedTab === 'practical'
          ? () => getPublicPracticalTasks(publicTaskPage)
          : () => getPublicTheoreticalTasks(publicTaskPage),
    },
  ]);

  const queryClient = useQueryClient();

  const { mutate, isLoading: mutationLoading } = useMutation('updateRecruitmentTasks', updateRecruitmentTasks, {
    onSuccess: () => {
      queryClient.refetchQueries(`recruitment-${recruitmentId}`);
      handleCloseModal();
      toast.success('Tasks updated successfully');
    },
    onError: () => {
      toast.error('An error occured during updating tasks, please try again later');
    },
  });

  const { control, handleSubmit } = useForm<IManageTasksForRecruitment>({
    resolver: zodResolver(ManageTasksForRecruitmentSchema),
    defaultValues: {
      tasks: [...practicalTasks, ...theoreitcalTasks],
    },
  });

  const onSubmit = () => {
    if (mutationLoading) {
      return;
    }
    handleSubmit(
      async (data) => {
        mutate({
          id: recruitmentId,
          ...data,
        });
      },
      (e) => {
        console.log(e);
      },
    )();
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tasks',
  });

  //   const filteredCompanyTasks = companyTasks?.items.filter(
  //     (task) => !fields.some((pickedTask) => pickedTask.idTask === task.id),
  //   );

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
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-dark">
                  Manage recruitment tasks
                </Dialog.Title>
                <div className="mt-5 flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-md font-semibold text-dark">Picked Tasks: </h3>
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="flex justify-between rounded-md bg-dark/5 p-2 text-sm text-dark shadow-md">
                        {field.question}
                        <button onClick={() => remove(index)}>
                          <FaDeleteLeft />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-24">
                    <TabElement tabName="practical" />
                    <TabElement tabName="theoretical" />
                  </div>
                  <div className="flex w-full text-dark">
                    <div className="flex basis-1/2 flex-col gap-2 p-2">
                      <h4 className="font-semibold">Company tasks</h4>
                      <div className="flex max-h-[40vh] min-h-[100px] flex-col gap-2 overflow-y-auto">
                        {companyTasksLoading && <Spinner />}
                        {companyTasksError && <p>An error occured during fetching data, please try again later</p>}
                        {companyTasks?.items?.map((task) => {
                          const isPicked = fields.some((pickedTask) => pickedTask.idTask === task.id);
                          return (
                            <div
                              key={task.id}
                              className={cn('flex justify-between bg-dark/5 p-1 text-sm shadow-md', {
                                'opacity-80': isPicked,
                              })}>
                              <p>{task.question}</p>
                              {!isPicked && (
                                <button
                                  onClick={() => {
                                    if (isPicked) {
                                      return;
                                    }
                                    append({
                                      idTask: task.id,
                                      question: task.question,
                                    });
                                  }}>
                                  <IoIosAdd size={16} className="font-bold text-success_color" />
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex flex-1">
                        {companyTasks && (
                          <PaginationFooter
                            totalPageNumber={companyTasks.totalPages}
                            callback={(pageNumber: number) => setCompanyTaskPage(pageNumber)}
                            currPage={companyTaskPage}
                            classNameHeight={8}
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex max-h-[40vh] basis-1/2 flex-col gap-2 overflow-y-auto p-2">
                      <h4 className="font-semibold">Public tasks</h4>
                      <div className="flex max-h-[40vh] min-h-[100px] flex-col gap-2 overflow-y-auto">
                        {publicTasksLoading && <Spinner />}
                        {publicTasksError && <p>An error occured during fetching data, please try again later</p>}
                        {publicTasks?.items?.map((task) => {
                          const isPicked = fields.some((pickedTask) => pickedTask.idTask === task.id);
                          return (
                            <div
                              key={task.id}
                              className={cn('flex justify-between bg-dark/5 p-1 text-sm shadow-md', {
                                'opacity-80': isPicked,
                              })}>
                              <p>{task.question}</p>
                              {!isPicked && (
                                <button
                                  onClick={() => {
                                    if (isPicked) {
                                      return;
                                    }
                                    append({
                                      idTask: task.id,
                                      question: task.question,
                                    });
                                  }}>
                                  <IoIosAdd size={16} className="font-bold text-success_color" />
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex flex-1">
                        {publicTasks && (
                          <PaginationFooter
                            totalPageNumber={publicTasks.totalPages}
                            callback={(pageNumber: number) => setPublicTaskPage(pageNumber)}
                            currPage={publicTaskPage}
                            classNameHeight={8}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <Button onClick={onSubmit}>
                    {mutationLoading ? <Spinner isLight className="h-6 w-6 border-2" /> : 'Save'}
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ManageTasksModal;
