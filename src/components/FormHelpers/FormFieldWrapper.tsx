import { FieldError, FieldValue, FieldValues, UseFormRegister } from 'react-hook-form';

type FormFieldWrapperProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  field: keyof T;
  error: FieldError | undefined;
  type?: React.HTMLInputTypeAttribute | undefined;
  autocomplete?: string;
  placeholder?: string;
  label?: string;
};

const FormFieldWrapper = <T extends FieldValues>({
  register,
  field,
  error,
  type = 'text',
  autocomplete = 'off',
  placeholder,
  label,
}: FormFieldWrapperProps<T>) => {
  const labelName = field.toString();
  return (
    <div className="flex w-full flex-col gap-2">
      <label className="font-semibold text-light">{label ?? labelName[0].toUpperCase() + labelName.slice(1)}</label>
      <input
        {...register(field as FieldValue<T>)}
        className={`h-11 w-full rounded border-2 bg-white px-2 py-2 text-base ${
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
