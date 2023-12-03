import { Control, UseFormRegister, useFieldArray } from 'react-hook-form';
import { IPersonalDataForm } from '../../../types/personalDataFormTypes';
import JobHistoryItem from './JobHistoryItem';

interface JobHistoryFieldProps {
  register: UseFormRegister<IPersonalDataForm>;
  control: Control<IPersonalDataForm>;
}

const JobHistoryField = ({ control, register }: JobHistoryFieldProps) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: 'jobHistory',
  });

  const handleRemoveField = (index: number) => {
    remove(index);
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <label className="basis-full font-semibold text-light">Job History</label>
      <div className="flex flex-col gap-2">
        {fields.map((field, index) => (
          <JobHistoryItem
            key={field.id}
            index={index}
            register={register}
            control={control}
            remove={() => handleRemoveField(index)}
          />
        ))}
        <button
          className="text-xl text-light"
          type="button"
          onClick={() =>
            append({
              startDate: '',
              endDate: '',
              nameOfCompany: '',
              position: '',
            })
          }>
          +
        </button>
      </div>
    </div>
  );
};

export default JobHistoryField;
