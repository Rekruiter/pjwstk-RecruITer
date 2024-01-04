import { IJobOfferInput } from '@/types/jobOfferTypes';
import { Control, FieldErrors, UseFormRegister, useWatch } from 'react-hook-form';

interface SalaryFieldProps {
  register: UseFormRegister<IJobOfferInput>;
  errors: FieldErrors<IJobOfferInput>;
  control: Control<IJobOfferInput>;
}

const SalaryField = ({ register, errors, control }: SalaryFieldProps) => {
  const currencyWatcher = useWatch({
    control: control,
    name: 'currency',
  });

  return (
    <div className="flex gap-2">
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-light">Min Salary</label>
        <input
          {...register('minSalary', {
            setValueAs(value) {
              return value ? Number(value) : undefined;
            },
          })}
          className={`h-11 rounded border-2 bg-white px-2 py-2 text-base ${
            errors.minSalary ? 'border-error_color' : 'border-light'
          }`}
          type={'number'}
          min={0}
        />
        {errors.minSalary && <div className="text-error_color">{errors.minSalary.message}</div>}
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-light">Max Salary</label>
        <input
          {...register('maxSalary', {
            setValueAs(value) {
              return value ? Number(value) : undefined;
            },
          })}
          className={`h-11 rounded border-2 bg-white px-2 py-2 text-base ${
            errors.maxSalary ? 'border-error_color' : 'border-light'
          }`}
          type={'number'}
          min={0}
        />
        {errors.maxSalary && <div className="text-error_color">{errors.maxSalary.message}</div>}
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-light">Currency</label>
        <select
          {...register('currency')}
          className={`h-11 rounded border-2 bg-white px-2 py-2 text-base ${
            errors.currency ? 'border-error_color' : 'border-light'
          } ${!currencyWatcher ? 'text-dark' : ''}`}>
          <option value="">Pick currency</option>
          <option value="PLN">PLN</option>
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
        </select>
        {errors.currency && <div className="text-error_color">{errors.currency.message}</div>}
      </div>
    </div>
  );
};

export default SalaryField;
