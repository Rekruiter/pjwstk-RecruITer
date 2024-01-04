import { IJobOfferInput } from '@/types/jobOfferTypes';
import { Control, UseFormRegister, useFieldArray } from 'react-hook-form';
import RequirementListItem from './RequirementListItem';

interface RequirementsFieldProps {
  register: UseFormRegister<IJobOfferInput>;
  control: Control<IJobOfferInput>;
}

const RequirementsField = ({ control, register }: RequirementsFieldProps) => {
  const { append, remove, fields } = useFieldArray({
    control,
    name: 'requirements',
  });

  return (
    <div className="flex w-full flex-col gap-2">
      <label className="font-semibold text-light">Requirements</label>
      {fields.map((field, index) => (
        <RequirementListItem key={field.id} register={register} remove={remove} index={index} control={control} />
      ))}
      <button
        className="text-xl text-light"
        type="button"
        onClick={() =>
          append({
            level: 0,
            technology: '',
          })
        }>
        +
      </button>
    </div>
  );
};

export default RequirementsField;
