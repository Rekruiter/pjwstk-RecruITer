import { Control, UseFormRegister, useFieldArray } from 'react-hook-form';
import { IPersonalDataForm } from '../../../types/personalDataFormTypes';
import PortfolioLinkItem from './PortfolioLinkItem';

interface PortfolioLinksFieldProps {
  control: Control<IPersonalDataForm>;
  register: UseFormRegister<IPersonalDataForm>;
}

const PortfolioLinksField = ({ control, register }: PortfolioLinksFieldProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'portfolioLinks',
  });

  const handleRemoveLink = (index: number) => {
    remove(index);
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <label className="basis-full font-semibold text-light">Portfolio links</label>
      <div className="flex flex-col gap-2">
        {fields.map((field, index) => (
          <PortfolioLinkItem
            key={field.id}
            remove={() => handleRemoveLink(index)}
            register={register}
            index={index}
            control={control}
          />
        ))}
        <button
          className="text-xl text-light"
          type="button"
          onClick={() =>
            append({
              linkUrl: '',
              name: '',
            })
          }>
          +
        </button>
      </div>
    </div>
  );
};

export default PortfolioLinksField;
