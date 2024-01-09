import { Switch } from '@headlessui/react';

interface FormToggleWrapperProps {
  isToggled: boolean;
  untoggledOption: string;
  toggledOption: string;
  label: string;
  onChange: (value: boolean) => void;
}

const FormToggleWrapper = ({ isToggled, onChange, toggledOption, untoggledOption, label }: FormToggleWrapperProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-light">{label}</label>
      <div className="flex items-center gap-2 text-light">
        <p>{untoggledOption}</p>
        <Switch
          checked={isToggled}
          onChange={(e) => onChange(e)}
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
        <p>{toggledOption}</p>
      </div>
    </div>
  );
};

export default FormToggleWrapper;
