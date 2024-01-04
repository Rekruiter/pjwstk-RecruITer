import { IJobOfferInput } from '@/types/jobOfferTypes';
import { Control, FieldErrors, UseFormRegister, useFieldArray } from 'react-hook-form';
import QuestionListItem from './QuestionListItem';

interface QuestionsFieldProps {
  register: UseFormRegister<IJobOfferInput>;
  control: Control<IJobOfferInput>;
  errors: FieldErrors<IJobOfferInput>;
}

const QuestionsField = ({ register, control, errors }: QuestionsFieldProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  return (
    <div className="flex w-full flex-col gap-2">
      <label className="font-semibold text-light">Questions</label>
      <div className="flex flex-wrap gap-2">
        {fields.map((field, index) => (
          <QuestionListItem key={field.id} register={register} remove={remove} index={index} errors={errors} />
        ))}
        <button
          className="text-xl text-light"
          type="button"
          onClick={() =>
            append({
              contents: '',
            })
          }>
          +
        </button>
      </div>
    </div>
  );
};

export default QuestionsField;
