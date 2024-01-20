import { planTechnicalRecruitment } from '@/api/recruitments/recruitments';
import { cn } from '@/lib/utils';
import { IInviteCandidateForRecruitment, InviteCandidateForRecruitmentSchema } from '@/types/recruitmentsTypes';
import { Dialog, Transition } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import Button from '../UI/Button';
import { getTechnicalRecruiters } from '@/api/recruiters/recruiters';
import Spinner from '@/components/UI/Spinner/Spinner';

interface InviteCandidateModalProps {
  recruitmentId: number;
  handleCloseModal: () => void;
  isInvitable: boolean;
}

const InviteCandidateModal = ({ recruitmentId, handleCloseModal, isInvitable }: InviteCandidateModalProps) => {
  const { data, isError, isLoading } = useQuery('technicalRecruiters', getTechnicalRecruiters);

  const queryClient = useQueryClient();

  const { mutate, isLoading: mutationLoading } = useMutation(
    ['inviteCandidateForRecruitment', recruitmentId],
    planTechnicalRecruitment,
    {
      onSuccess: () => {
        queryClient.refetchQueries(`recruitment-${recruitmentId}`);
        queryClient.invalidateQueries('recruitments');
        toast.success('Candidate invited for recruitment');
        handleCloseModal();
      },
      onError: () => {
        toast.error('An error occured, please try again later');
      },
    },
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IInviteCandidateForRecruitment>({
    resolver: zodResolver(InviteCandidateForRecruitmentSchema),
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <p className="m-auto">An error occured, please try again later</p>;
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mutationLoading || !isInvitable) return;
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

  const pickedRecruiterWatch = watch('idRecruiter');

  const pickedRecruiter =
    pickedRecruiterWatch !== null ? data?.find((recruiter) => recruiter.id == pickedRecruiterWatch) : undefined;

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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-dark">
                  Inviting candidate for recruitment
                </Dialog.Title>
                {pickedRecruiter && (
                  <div className="mt-5 flex flex-col gap-1 bg-dark/5 p-2 text-dark shadow-md">
                    <p className="mb-2 font-semibold">Recruiter information</p>
                    <p>Name: {pickedRecruiter.name}</p>
                    <p>Surname: {pickedRecruiter.surname}</p>
                    <p>Position: {pickedRecruiter.position}</p>
                    <p>Phone number: {pickedRecruiter.phoneNumber}</p>
                    <p>Email: {pickedRecruiter.email}</p>
                    <p>Known technologies:</p>
                    <div className="flex flex-wrap gap-3 p-2">
                      {pickedRecruiter.technologies.map((technology) => (
                        <p className="rounded-sm bg-dark_blue/80 p-1 text-light shadow-md">{technology.name}</p>
                      ))}
                    </div>
                  </div>
                )}
                <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-4">
                  <label htmlFor="idRecruiter" className="font-semibold text-dark">
                    Recruiter
                  </label>
                  <select
                    {...register('idRecruiter', {
                      setValueAs(value) {
                        return value ? Number(value) : undefined;
                      },
                    })}
                    className={cn('text-dark', {
                      'border border-error_color': errors.idRecruiter,
                    })}>
                    <option value={''}>Pick a recruiter</option>
                    {data?.map((recruiter) => (
                      <option key={recruiter.id} value={recruiter.id}>
                        {recruiter.name} {recruiter.surname} {recruiter.position}
                      </option>
                    ))}
                  </select>
                  {errors.idRecruiter && <div className="text-error_color">{errors.idRecruiter.message}</div>}
                  <label htmlFor="DateTechnical" className="font-semibold text-dark">
                    Technical Interview Date
                  </label>
                  <input
                    {...register('DateTechnical')}
                    type="datetime-local"
                    className={cn({
                      'border border-error_color': errors.DateTechnical,
                    })}
                  />
                  {errors.DateTechnical && <div className="text-error_color">{errors.DateTechnical.message}</div>}
                  <Button>
                    {mutationLoading ? <Spinner isLight className="h-6 w-6 border-2" /> : 'Invite candidate'}
                  </Button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default InviteCandidateModal;
