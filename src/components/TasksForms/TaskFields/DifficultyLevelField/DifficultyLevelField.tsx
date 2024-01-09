import { FieldError, FieldValue, FieldValues, UseFormRegister } from 'react-hook-form';

interface DifficultyLevelFieldProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  error?: FieldError;
}

const DifficultyLevelField = <T extends FieldValues>({ register, error }: DifficultyLevelFieldProps<T>) => {
  return (
    <div className="flex w-[45%] flex-col gap-2 md:w-[30%]">
      <label className="font-semibold text-light">Difficulty level (1-5)</label>
      <input
        {...register('difficultyLevel' as FieldValue<T>, {
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
