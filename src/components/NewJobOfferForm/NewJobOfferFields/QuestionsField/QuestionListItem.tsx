import { IJobOfferInput } from '@/types/jobOfferTypes';
import { FieldErrors, UseFieldArrayRemove, UseFormRegister } from 'react-hook-form';
import { FaDeleteLeft } from 'react-icons/fa6';

interface QuestionListItemProps {
  register: UseFormRegister<IJobOfferInput>;
  remove: UseFieldArrayRemove;
  index: number;
  errors: FieldErrors<IJobOfferInput>;
}

const QuestionListItem = ({ register, remove, index, errors }: QuestionListItemProps) => {
  const technologyError = errors.questions?.[index]?.contents;

  const handleRemoveQuestion = () => remove(index);

  return (
    <div className="flex basis-[45%] gap-5 rounded-md bg-light/10 p-3 shadow-md">
      <div className="flex flex-1 flex-col gap-2">
        <input
          {...register(`questions.${index}.contents`)}
          className={`h-8 rounded border-2 bg-white px-2 py-2 text-base ${
            technologyError ? 'border-error_color' : 'border-light'
          }`}
        />
        {technologyError && <p className="text-error_color">{technologyError.message}</p>}
      </div>
      <button type="button" onClick={handleRemoveQuestion} className="text-light">
        <FaDeleteLeft size={20} />
      </button>
    </div>
  );
};

export default QuestionListItem;
