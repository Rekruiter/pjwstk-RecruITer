import { FieldError, FieldValue, FieldValues, UseFormRegister } from 'react-hook-form';

type FormFieldWrapperProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  field: keyof T;
  error: FieldError | undefined;
  type?: React.HTMLInputTypeAttribute | undefined;
  autocomplete?: string;
  placeholder?: string;
};

const FormFieldWrapper = <T extends FieldValues>({
  register,
  field,
  error,
  type = 'text',
  autocomplete = 'off',
  placeholder,
}: FormFieldWrapperProps<T>) => {
  const labelName = field.toString();
  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-light font-semibold">{labelName[0].toUpperCase() + labelName.slice(1)}</label>
      <input
        {...register(field as FieldValue<T>)}
        className={`w-full rounded py-2 pl-2 bg-white text-base h-10 border-2 ${
          error ? 'border-error_color' : 'border-light'
        }`}
        type={type}
        autoComplete={autocomplete}
        placeholder={placeholder}
      />
      {error && <div className="text-error_color">{error.message}</div>}
    </div>
  );
};

export default FormFieldWrapper;
