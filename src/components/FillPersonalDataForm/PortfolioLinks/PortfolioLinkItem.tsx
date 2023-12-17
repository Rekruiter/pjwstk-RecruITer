import { Control, UseFormRegister, useFormState } from 'react-hook-form';
import { IPersonalDataForm } from '../../../types/personalDataFormTypes';
import { FaDeleteLeft } from 'react-icons/fa6';

interface PortfolioLinkItemProps {
  remove: () => void;
  register: UseFormRegister<IPersonalDataForm>;
  index: number;
  control: Control<IPersonalDataForm>;
}

const PortfolioLinkItem = ({ remove, register, index, control }: PortfolioLinkItemProps) => {
  const { errors } = useFormState({
    control,
  });

  const nameError = errors.portfolioLinks?.[index]?.name;
  const linkUrlError = errors.portfolioLinks?.[index]?.linkUrl;

  return (
    <div className="flex w-full flex-col gap-1 rounded-md bg-light/5 p-3 text-dark shadow-xl">
      <input
        {...register(`portfolioLinks.${index}.name`)}
        className={`w-fit rounded-md p-1 ${nameError ? 'border-2 border-error_color' : ''}`}
        placeholder="Name"
      />
      {nameError && <span className="text-error_color">{nameError.message}</span>}
      <div className="flex gap-3 text-dark">
        <input
          {...register(`portfolioLinks.${index}.linkUrl`)}
          className={`w-full rounded-md bg-light p-1 ${linkUrlError ? 'border-2 border-error_color' : ''}`}
          placeholder="Link url"
        />
        <button onClick={remove} className="text-white" type="button">
          <FaDeleteLeft />
        </button>
      </div>
      {linkUrlError && <span className="text-error_color">{linkUrlError.message}</span>}
    </div>
  );
};

export default PortfolioLinkItem;
