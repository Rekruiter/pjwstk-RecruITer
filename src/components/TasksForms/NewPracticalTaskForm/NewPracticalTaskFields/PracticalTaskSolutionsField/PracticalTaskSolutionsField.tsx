import { IPracticalTaskFormInput } from '@/types/tasksTypes';
import { Control, UseFormClearErrors, UseFormRegister, useFieldArray, useFormState } from 'react-hook-form';
import PracitcalTaskSolutionListItem from './PracitcalTaskSolutionListItem';

interface PracticalTaskSolutionsFieldProps {
  control: Control<IPracticalTaskFormInput>;
  register: UseFormRegister<IPracticalTaskFormInput>;
  clearErrors: UseFormClearErrors<IPracticalTaskFormInput>;
}

const PracticalTaskSolutionsField = ({ control, register, clearErrors }: PracticalTaskSolutionsFieldProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'practicalTaskSolutions',
  });

  const { errors } = useFormState({
    control,
  });

  const removeSolution = (index: number) => remove(index);

  return (
    <div className="flex w-full flex-col gap-2">
      <label className="font-semibold text-light">Task solutions</label>
      {fields.map((field, index) => (
        <PracitcalTaskSolutionListItem
          key={field.id}
          field={field}
          register={register}
          index={index}
          handleRemove={() => removeSolution(index)}
          errors={errors.practicalTaskSolutions}
        />
      ))}
      <button
        className="mx-auto rounded-md bg-orange px-2 py-1.5 text-sm text-light"
        type="button"
        onClick={() => {
          clearErrors('practicalTaskSolutions');
          append({
            compilationLanguage: '',
            bestSolution: '',
            bruteForceSolution: '',
            mediumSolution: '',
          });
        }}>
        Add task solution
      </button>
      {errors.practicalTaskSolutions && <div className="text-error_color">{errors.practicalTaskSolutions.message}</div>}
    </div>
  );
};

export default PracticalTaskSolutionsField;
