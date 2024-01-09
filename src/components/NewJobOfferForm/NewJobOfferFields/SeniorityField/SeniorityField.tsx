import { IJobOfferInput } from '@/types/jobOfferTypes';
import { Control, FieldError, UseFormRegister, useWatch } from 'react-hook-form';

interface SeniorityFieldProps {
  register: UseFormRegister<IJobOfferInput>;
  error?: FieldError;
  control: Control<IJobOfferInput>;
}

const SeniorityField = ({ register, error, control }: SeniorityFieldProps) => {
  const seniorityWatcher = useWatch({
    control: control,
    name: 'seniority',
  });

  return (
    <div className="flex w-1/2 flex-col gap-2">
      <label className="font-semibold text-light">Seniority</label>
      <select
        {...register('seniority')}
        className={`h-11 rounded border-2 bg-white px-2 py-2 text-base ${
          error ? 'border-error_color' : 'border-light'
        } ${!seniorityWatcher ? 'text-dark' : ''}`}>
        <option value="">Pick seniority</option>
        <option value="Intern">Intern</option>
        <option value="Junior">Junior</option>
        <option value="Mid">Mid</option>
        <option value="Senior">Senior</option>
      </select>
      {error && <div className="text-error_color">{error.message}</div>}
    </div>
  );
};

export default SeniorityField;
