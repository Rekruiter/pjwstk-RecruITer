import { IPracticalTaskFormInput } from '@/types/tasksTypes';
import { FieldError, UseFormRegister } from 'react-hook-form';

interface DifficultyLevelFieldProps {
  register: UseFormRegister<IPracticalTaskFormInput>;
  error?: FieldError;
}

const DifficultyLevelField = ({ register, error }: DifficultyLevelFieldProps) => {
  return (
    <div className="flex w-[45%] flex-col gap-2 md:w-[30%]">
      <label className="font-semibold text-light">Difficulty level (1-5)</label>
      <input
        {...register('difficultyLevel', {
          setValueAs(value) {
            return value ? Number(value) : undefined;
          },
        })}
        className={`h-11 rounded border-2 bg-white px-2 py-2 text-base ${
          error ? 'border-error_color' : 'border-light'
        }`}
        type={'number'}
        placeholder="Diffculty level"
        min={0}
        max={5}
      />
      {error && <div className="text-error_color">{error.message}</div>}
    </div>
  );
};

export default DifficultyLevelField;
