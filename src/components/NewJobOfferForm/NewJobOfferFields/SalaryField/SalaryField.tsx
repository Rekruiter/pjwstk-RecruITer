import { IJobOfferInput } from '@/types/jobOfferTypes';
import { useState } from 'react';
import { Control, FieldErrors, UseFormRegister, useWatch } from 'react-hook-form';

interface SalaryFieldProps {
  register: UseFormRegister<IJobOfferInput>;
  errors: FieldErrors<IJobOfferInput>;
  control: Control<IJobOfferInput>;
}

const SalaryField = ({ register, errors, control }: SalaryFieldProps) => {
  const [isPriceRanges, setIsPriceRanges] = useState(true);

  const currencyWatcher = useWatch({
    control: control,
    name: 'currency',
  });

  return (
    <div className="flex flex-wrap gap-2">
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-light">{isPriceRanges ? 'Min Salary' : 'Salary'}</label>
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
        {errors.minSalary && (
          <div className="text-error_color">{isPriceRanges ? errors.minSalary.message : 'Salary is required'}</div>
        )}
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <input
          type="checkbox"
          className="h-4 w-4"
          checked={isPriceRanges}
          onChange={(e) => {
            setIsPriceRanges(e.target.checked);
          }}
        />
      </div>
      {isPriceRanges ? (
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
      ) : (
        <p className="place-self-center text-sm font-light text-light">Add salary ranges</p>
      )}
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
