import FormFieldWrapper from '@/components/FormHelpers/FormFieldWrapper';
import { IJobOfferInput } from '@/types/jobOfferTypes';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface LocationFieldProps {
  register: UseFormRegister<IJobOfferInput>;
  errors: FieldErrors<IJobOfferInput>;
}

const LocationField = ({ register, errors }: LocationFieldProps) => {
  return (
    <div className="flex items-center gap-10">
      <FormFieldWrapper<IJobOfferInput>
        field="location"
        error={errors.location}
        register={register}
        className="w-1/2"
        placeholder='Location (e.g. "Warsaw")'
      />
      <div className="flex flex-col gap-2">
        <label htmlFor="isRemote" className="font-semibold text-light">
          isRemote
        </label>
        <input {...register('isRemote')} type="checkbox" className="h-6 w-6" />
      </div>
    </div>
  );
};

export default LocationField;
