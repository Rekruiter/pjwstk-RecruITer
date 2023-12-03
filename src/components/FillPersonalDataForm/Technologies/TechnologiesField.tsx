import { Control, useFieldArray } from 'react-hook-form';
import { IPersonalDataForm } from '../../../types/personalDataFormTypes';
import { useState } from 'react';
import { FaDeleteLeft } from 'react-icons/fa6';
import TechnologiesModal from './TechnologiesModal';

interface TechnologiesFieldProps {
  control: Control<IPersonalDataForm>;
}

const TechnologiesField = ({ control }: TechnologiesFieldProps) => {
  const { fields, update } = useFieldArray({
    name: 'technologies',
    control,
  });

  const [isOpenedModal, setIsOpenedModal] = useState(false);

  const handleCloseModal = () => {
    setIsOpenedModal(false);
  };

  const pickedTechnologies = fields.filter((field) => field.isPicked);

  const handleRemoveTechnology = (technologyId: string) => {
    const technologyIndex = fields.findIndex((field) => field.id === technologyId);
    update(technologyIndex, {
      ...fields[technologyIndex],
      isPicked: false,
    });
  };

  const handlePickTechnology = (technologyId: string) => {
    const technologyIndex = fields.findIndex((field) => field.id === technologyId);
    update(technologyIndex, {
      ...fields[technologyIndex],
      isPicked: true,
    });
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <label className="basis-full font-semibold text-light">Your technologies</label>
      <div className="flex gap-2">
        {pickedTechnologies.length !== 0 && (
          <div className="basis-3/4 flex-col rounded-xl">
            <div className="flex max-h-[100px] basis-3/4 flex-wrap gap-5 overflow-auto rounded-xl bg-light p-3">
              {pickedTechnologies.map((field) => (
                <p
                  key={field.id}
                  className="relative flex items-center gap-3 rounded-md border border-dark  p-1 text-sm text-dark">
                  {field.name}
                  <button type="button" onClick={() => handleRemoveTechnology(field.id)}>
                    <FaDeleteLeft size={20} />
                  </button>
                </p>
              ))}
            </div>
          </div>
        )}
        <button
          className="mx-auto basis-1/4 rounded-md bg-orange px-2 py-1.5 text-sm text-light"
          type="button"
          onClick={() => setIsOpenedModal(true)}>
          Add technology
        </button>
      </div>
      {isOpenedModal && (
        <TechnologiesModal
          fields={fields}
          handleCloseModal={handleCloseModal}
          handlePickTechnology={handlePickTechnology}
        />
      )}
    </div>
  );
};

export default TechnologiesField;
