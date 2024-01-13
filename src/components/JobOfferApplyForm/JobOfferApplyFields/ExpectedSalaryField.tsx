import { IApplyJobOffer } from '@/types/jobOfferTypes';
import { FieldError, UseFormRegister } from 'react-hook-form';

interface ExpectedSalaryFieldProps {
  register: UseFormRegister<IApplyJobOffer>;
  error: FieldError | undefined;
}

const ExpectedSalaryField = ({ register, error }: ExpectedSalaryFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-dark">What is your expected salary? (PLN per 1 hour )</label>
      <input
        placeholder="Enter your expected salary"
        {...register('expectedSalary', {
          setValueAs(value) {
            return value ? Number(value) : undefined;
          },
        })}
        className={`h-11 rounded border-2 bg-white px-2 py-2 text-base ${
          error ? 'border-error_color' : 'border-light'
        }`}
        type={'number'}
        min={0}
      />
      {error && <div className="text-error_color">{error.message}</div>}
    </div>
  );
};

export default ExpectedSalaryField;
