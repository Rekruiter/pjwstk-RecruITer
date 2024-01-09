import { IJobOfferInput } from '@/types/jobOfferTypes';
import { FieldError, UseFormRegister } from 'react-hook-form';

interface DescriptionFieldProps {
  register: UseFormRegister<IJobOfferInput>;
  error?: FieldError;
}

const DescriptionField = ({ register, error }: DescriptionFieldProps) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <label className="font-semibold text-light">Description</label>
      <textarea
        {...register('description')}
        className={`h-32 w-full rounded border-2 bg-white px-2 py-2 text-base ${
          error ? 'border-error_color' : 'border-light'
        }`}
        autoComplete="off"
        placeholder="Your job offer description here..."
        minLength={10}
        maxLength={500}
      />
      {error && <div className="text-error_color">{error.message}</div>}
    </div>
  );
};

export default DescriptionField;
