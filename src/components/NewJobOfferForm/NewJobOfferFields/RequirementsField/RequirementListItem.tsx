import { IJobOfferInput } from '@/types/jobOfferTypes';
import { Control, UseFieldArrayRemove, UseFormRegister, useController } from 'react-hook-form';

interface RequirementListItemProps {
  register: UseFormRegister<IJobOfferInput>;
  remove: UseFieldArrayRemove;
  control: Control<IJobOfferInput>;
  index: number;
}

const RequirementListItem = ({ remove, register, control, index }: RequirementListItemProps) => {
  const levelController = useController({
    control: control,
    name: `requirements.${index}.level`,
  });

  // TODO: Add select from stars 1-5 connected with level controller

  return (
    <div className="flex items-center gap-2">
      <input {...register(`requirements.${index}.technology`)} />
    </div>
  );
};

export default RequirementListItem;
