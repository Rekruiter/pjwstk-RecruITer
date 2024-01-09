import { IPracticalTaskFormInput } from '@/types/tasksTypes';
import { FieldError, UseFormRegister } from 'react-hook-form';

interface CodeRelatedToQuestionFieldProps {
  register: UseFormRegister<IPracticalTaskFormInput>;
  error: FieldError | undefined;
}

const CodeRelatedToQuestionField = ({ register, error }: CodeRelatedToQuestionFieldProps) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <label className="font-semibold text-light">Code related to question</label>
      <textarea
        {...register('codeRelatedToQuestion')}
        className={`h-32 w-full rounded border-2 bg-white px-2 py-2 text-base ${
          error ? 'border-error_color' : 'border-light'
        }`}
        autoComplete="off"
        placeholder="Your job offer description here..."
        minLength={1}
        maxLength={500}
      />
      {error && <div className="text-error_color">{error.message}</div>}
    </div>
  );
};

export default CodeRelatedToQuestionField;
