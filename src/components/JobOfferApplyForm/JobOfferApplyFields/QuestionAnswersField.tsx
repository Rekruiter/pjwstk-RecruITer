import { IApplyJobOffer } from '@/types/jobOfferTypes';
import { FieldErrors, UseFormGetValues, UseFormRegister } from 'react-hook-form';

interface QuestionAnswersFieldProps {
  register: UseFormRegister<IApplyJobOffer>;
  errors: FieldErrors<IApplyJobOffer>['answers'];
  getValues: UseFormGetValues<IApplyJobOffer>;
}

const QuestionAnswersField = ({ errors, register, getValues }: QuestionAnswersFieldProps) => {
  const fields = getValues('answers');

  return (
    <div className="flex flex-col gap-5">
      {fields.length !== 0 && <label className="font-semibold text-dark">Answer questions</label>}
      {fields.map((field, idx) => (
        <div key={idx} className="flex flex-col gap-2">
          <label className="text-sm font-medium text-dark">{field.question}</label>
          <input
            {...register(`answers.${idx}.answerToQuestion`)}
            placeholder="Write your answer here..."
            className={`h-11 rounded border-2 bg-white px-2 py-2 text-sm ${
              errors && errors[idx] ? 'border-error_color' : 'border-light'
            }`}
          />
          {errors && errors[idx]?.answerToQuestion && (
            <div className="text-error_color">{errors[idx]?.answerToQuestion?.message}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuestionAnswersField;
