import { Switch } from '@headlessui/react';
import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';

interface FormToggleWrapperProps<T extends FieldValues, F extends FieldPath<T>> {
  isToggled: boolean;
  field: ControllerRenderProps<T, F>;
}

const FormToggleWrapper = <T extends FieldValues, F extends FieldPath<T>>({
  isToggled,
  field,
}: FormToggleWrapperProps<T, F>) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-light">Status</label>
      <div className="flex items-center gap-2 text-light">
        <p>Free</p>
        <Switch
          checked={isToggled}
          onChange={(e) => {
            field.onChange(e ? 'hired' : 'free');
          }}
          className={`${isToggled ? 'bg-orange' : 'bg-light'}
    relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}>
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${isToggled ? 'translate-x-9 bg-white' : 'translate-x-0 bg-orange'}
      pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full 
       shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
        <p>Hired</p>
      </div>
    </div>
  );
};

export default FormToggleWrapper;
