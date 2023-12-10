import { Control, UseFormRegister, useFormState } from 'react-hook-form';
import { IPersonalDataForm } from '../../../types/personalDataFormTypes';
import { MdDeleteOutline } from 'react-icons/md';
import { MAX_DATE, MIN_DATE } from '../../../constants/dateInputValues';

interface JobHistoryItemProps {
  index: number;
  register: UseFormRegister<IPersonalDataForm>;
  control: Control<IPersonalDataForm>;
  remove: () => void;
}

const JobHistoryItem = ({ index, register, control, remove }: JobHistoryItemProps) => {
  const { errors } = useFormState({
    control,
  });

  const startDateError = errors.jobHistory?.[index]?.startDate;
  const endDateError = errors.jobHistory?.[index]?.endDate;
  const nameOfCompanyError = errors.jobHistory?.[index]?.nameOfCompany;
  const positionError = errors.jobHistory?.[index]?.position;

  return (
    <div className="flex w-full flex-col gap-1 border border-light p-2 text-dark">
      <div className="flex flex-col justify-between gap-2 sm:flex-row">
        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-5">
            <label className="text-white">Date from</label>
            <input
              {...register(`jobHistory.${index}.startDate`)}
              className="rounded-md p-1"
              type="date"
              min={MIN_DATE}
              max={MAX_DATE}
            />
          </div>
          {startDateError && <span className="text-error_color">{startDateError.message}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-5">
            <label className="text-white">Date to</label>
            <input
              {...register(`jobHistory.${index}.endDate`)}
              className="rounded-md p-1"
              type="date"
              min={MIN_DATE}
              max={MAX_DATE}
            />
          </div>
          {endDateError && <span className="text-error_color">{endDateError.message}</span>}
        </div>
      </div>
      <div className="flex flex-col gap-5 sm:flex-row">
        <div className="flex basis-1/2 flex-col">
          <label className="text-white">Company Name</label>
          <input {...register(`jobHistory.${index}.nameOfCompany`)} className="rounded-md p-1" type="text" />
          {nameOfCompanyError && <span className="text-error_color">{nameOfCompanyError.message}</span>}
        </div>
        <div className="flex basis-1/2 flex-col">
          <label className="text-white">Position</label>
          <input {...register(`jobHistory.${index}.position`)} className="rounded-md p-1" type="text" />
          {positionError && <span className="text-error_color">{positionError.message}</span>}
        </div>
      </div>
      <button className="mx-auto w-fit text-light" type="button" onClick={remove}>
        <MdDeleteOutline size={20} />
      </button>
    </div>
  );
};

export default JobHistoryItem;
