import { cn } from '@/lib/utils';
import { IJobOfferInput } from '@/types/jobOfferTypes';
import {
  Control,
  UseFieldArrayRemove,
  UseFieldArrayUpdate,
  UseFormGetValues,
  UseFormRegister,
  UseFormTrigger,
  useFormState,
} from 'react-hook-form';
import { FaStar } from 'react-icons/fa';

interface RequirementListItemProps {
  pickedLevel: number;
  technology: string;
  register: UseFormRegister<IJobOfferInput>;
  remove: UseFieldArrayRemove;
  update: UseFieldArrayUpdate<IJobOfferInput, 'requirements'>;
  getValues: UseFormGetValues<IJobOfferInput>;
  trigger: UseFormTrigger<IJobOfferInput>;
  control: Control<IJobOfferInput>;
  index: number;
}

const RequirementListItem = ({
  register,
  control,
  index,
  pickedLevel,
  update,
  getValues,
  trigger,
}: RequirementListItemProps) => {
  const { errors } = useFormState({
    control,
  });

  const DEFAULT_LEVELS = [1, 2, 3, 4, 5];

  const levelError = errors.requirements?.[index]?.level;
  const technologyError = errors.requirements?.[index]?.technology;

  const updateLevel = (level: number) => {
    update(index, {
      level,
      technology: getValues(`requirements.${index}.technology`),
    });
    trigger(`requirements.${index}`);
  };

  return (
    <div className="flex w-full flex-col gap-2 rounded-md bg-light/10 p-3 shadow-md">
      <label className="font-normal text-light">Technology</label>
      <div className="flex flex-wrap gap-5">
        <div className="flex flex-col gap-2">
          <input
            {...register(`requirements.${index}.technology`)}
            className={`h-8 rounded border-2 bg-white px-2 py-2 text-base ${
              technologyError ? 'border-error_color' : 'border-light'
            }`}
          />
          {technologyError && <p className="text-error_color">{technologyError.message}</p>}
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <div className="inline-flex gap-2 pt-2">
            {DEFAULT_LEVELS.map((level) => (
              <FaStar
                key={level}
                className={cn('cursor-pointer text-orange/50 hover:brightness-150', {
                  'text-orange shadow-sm brightness-110': pickedLevel && level <= pickedLevel,
                })}
                onClick={() => updateLevel(level)}
              />
            ))}
          </div>
          {levelError && <p className="text-error_color">{levelError.message}</p>}
        </div>
      </div>
    </div>
  );
};

export default RequirementListItem;
