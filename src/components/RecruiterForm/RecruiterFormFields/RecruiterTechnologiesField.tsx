import FormToggleWrapper from '@/components/FormHelpers/FormToggleWrapper';
import { IRecruiterInputForm } from '@/types/recruiterTypes';
import { Control, FieldErrors, UseFormRegister, UseFormSetValue, useWatch } from 'react-hook-form';
import { FaDeleteLeft } from 'react-icons/fa6';

interface RecruiterTechnologiesFieldProps {
  register: UseFormRegister<IRecruiterInputForm>;
  setValue: UseFormSetValue<IRecruiterInputForm>;
  control: Control<IRecruiterInputForm>;
  errors: FieldErrors<IRecruiterInputForm>['technologies'];
}

const RecruiterTechnologiesField = ({ register, setValue, control, errors }: RecruiterTechnologiesFieldProps) => {
  const technologiesWatcher = useWatch({
    control,
    name: 'technologies',
  });

  return (
    <div className="flex w-full flex-col gap-2">
      <FormToggleWrapper
        isToggled={Boolean(technologiesWatcher)}
        label="Role"
        untoggledOption="Recruiter"
        toggledOption="Technical Recruiter"
        onChange={(value) => setValue('technologies', value ? [] : null)}
      />
      {technologiesWatcher && (
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-light">Technologies</label>
          <div className="flex flex-col gap-3">
            {technologiesWatcher.map((_, index) => (
              <div key={index}>
                <div className="flex justify-between gap-5">
                  <input
                    {...register(`technologies.${index}`)}
                    type="text"
                    className={`h-11 w-full rounded border-2 bg-white px-2 py-2 text-base ${
                      errors && errors[index] ? 'border-error_color' : 'border-light'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const technologiesCopy = [...technologiesWatcher];
                      technologiesCopy.splice(index, 1);
                      setValue('technologies', technologiesCopy);
                    }}
                    className="text-light">
                    <FaDeleteLeft size={20} />
                  </button>
                </div>
                {errors && errors[index] && <div className="text-error_color">{errors[index]?.message}</div>}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setValue('technologies', [...technologiesWatcher, ''])}
            className="place-self-start rounded-md bg-light_blue px-2 py-1 text-dark">
            Add technology
          </button>
        </div>
      )}
    </div>
  );
};

export default RecruiterTechnologiesField;
