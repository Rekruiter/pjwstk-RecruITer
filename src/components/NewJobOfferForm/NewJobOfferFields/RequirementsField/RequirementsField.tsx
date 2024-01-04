import { IJobOfferInput } from '@/types/jobOfferTypes';
import { Control, UseFormGetValues, UseFormRegister, UseFormTrigger, useFieldArray } from 'react-hook-form';
import RequirementListItem from './RequirementListItem';

interface RequirementsFieldProps {
  register: UseFormRegister<IJobOfferInput>;
  control: Control<IJobOfferInput>;
  getValues: UseFormGetValues<IJobOfferInput>;
  trigger: UseFormTrigger<IJobOfferInput>;
}

const RequirementsField = ({ control, register, getValues, trigger }: RequirementsFieldProps) => {
  const { append, remove, fields, update } = useFieldArray({
    control,
    name: 'requirements',
  });

  return (
    <div className="flex w-full flex-col gap-2">
      <label className="font-semibold text-light">Requirements</label>
      {fields.map((field, index) => (
        <RequirementListItem
          key={field.id}
          pickedLevel={field.level}
          register={register}
          remove={remove}
          index={index}
          control={control}
          update={update}
          getValues={getValues}
          trigger={trigger}
        />
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
