import { deactivateRecruiter } from '@/api/recruiters/recruiters';
import { GetPathsLinks } from '@/constants/paths';
import { IRecruiter } from '@/types/recruiterTypes';
import { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import ConfirmModal from '../UI/ConfirmModal/ConfirmModal';
import Button from '../UI/Button';
import Spinner from '../UI/Spinner/Spinner';
import { toast } from 'react-toastify';

interface RecruiterListItemProps {
  recruiter: IRecruiter;
}

const RecruiterListItem = ({ recruiter }: RecruiterListItemProps) => {
  const [showCofnirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation(['deleteRecruiter', recruiter.id], deactivateRecruiter, {
    onSuccess: () => {
      toast.success('Recruiter deleted successfully');
      queryClient.refetchQueries('recruiters');
      setShowConfirmDeleteModal(false);
    },
    onError: () => {
      toast.error('An error occured, please try again later');
    },
  });

  const handleRemoveRecruiter = () => {
    if (isLoading) {
      return;
    }
    mutate(recruiter.id);
  };

  return (
    <div
      key={recruiter.id}
      className="flex w-full justify-between rounded-md bg-dark/10 p-3 pl-5 text-xl text-dark shadow-md hover:border-none hover:bg-orange hover:text-light">
      <div className="flex flex-col gap-2">
        <p>
          {recruiter.name} {recruiter.surname}
        </p>
        <p>{recruiter.email}</p>
        <p>{recruiter.position}</p>
      </div>
      <div className="flex flex-col items-end justify-between">
        <Link to={GetPathsLinks.getEditRecruiter(recruiter.id)} className="flex items-center hover:scale-110">
          <CiEdit size={32} />
        </Link>
        <button className="hover:scale-110" onClick={() => setShowConfirmDeleteModal(true)}>
          <MdDeleteOutline size={28} />
        </button>
        {showCofnirmDeleteModal && (
          <ConfirmModal
            handleCloseModal={() => setShowConfirmDeleteModal(false)}
            title={`Are you sure you want to delete ${recruiter.name} ${recruiter.surname}? \n This action can not be undone !`}>
            <div className="mt-10 flex justify-center gap-5">
              <Button className="bg-success_color" disabled={isLoading} onClick={handleRemoveRecruiter}>
                {isLoading ? <Spinner isLight className="h-6 w-6 border-4" /> : 'Confirm'}
              </Button>
              <Button className="bg-error_color" onClick={() => setShowConfirmDeleteModal(false)}>
                Cancel
              </Button>
            </div>
          </ConfirmModal>
        )}
      </div>
    </div>
  );
};

export default RecruiterListItem;
