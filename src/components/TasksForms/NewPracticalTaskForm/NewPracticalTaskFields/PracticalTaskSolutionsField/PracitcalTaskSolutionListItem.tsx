import { IPracticalTaskFormInput } from '@/types/tasksTypes';
import { useState } from 'react';
import { FieldArrayWithId, FieldErrors, UseFormRegister } from 'react-hook-form';
import { FaDeleteLeft } from 'react-icons/fa6';

interface PracitcalTaskSolutionListItemProps {
  field: FieldArrayWithId<IPracticalTaskFormInput, 'practicalTaskSolutions'>;
  register: UseFormRegister<IPracticalTaskFormInput>;
  index: number;
  handleRemove: () => void;
  errors: FieldErrors<IPracticalTaskFormInput>['practicalTaskSolutions'];
}

const PracitcalTaskSolutionListItem = ({
  register,
  index,
  handleRemove,
  errors,
  field,
}: PracitcalTaskSolutionListItemProps) => {
  const [shownSolutions, setShownSolutions] = useState({
    bestSolution: !!field.bestSolution,
    mediumSolution: !!field.mediumSolution,
    bruteForceSolution: !!field.bruteForceSolution,
  });

  const error = errors ? errors[index] : undefined;

  return (
    <div className="flex flex-col items-center gap-2 rounded-md bg-light/5 p-3 shadow-md">
      <div className="flex flex-col gap-2">
        <div className="flex gap-5">
          <label className="mt-1 text-sm text-light" htmlFor={`practicalTaskSolutions.${index}.compilationLanguage`}>
            Technology
          </label>
          <input
            {...register(`practicalTaskSolutions.${index}.compilationLanguage`)}
            className="w-fit rounded-md p-1"
          />
        </div>
        {error?.compilationLanguage && <div className="text-error_color">{error.compilationLanguage.message}</div>}
      </div>
      {shownSolutions.bestSolution ? (
        <div className="flex w-full gap-5">
          <label htmlFor={`practicalTaskSolutions.${index}.bestSolution`} className="basis-1/6 text-sm text-light">
            Best solution
          </label>
          <textarea
            {...register(`practicalTaskSolutions.${index}.bestSolution`)}
            className={`h-24 flex-1 rounded border-2 bg-white px-2 py-2 text-base ${
              error ? 'border-error_color' : 'border-light'
            }`}
            autoComplete="off"
            placeholder="Your best solution here..."
            maxLength={500}
          />
        </div>
      ) : (
        <button
          className="place-self-start rounded-md bg-orange p-1 text-sm text-light"
          onClick={() => setShownSolutions((prevState) => ({ ...prevState, bestSolution: true }))}>
          Add best solution
        </button>
      )}
      {shownSolutions.mediumSolution ? (
        <div className="flex w-full gap-5">
          <label htmlFor={`practicalTaskSolutions.${index}.mediumSolution`} className="basis-1/6 text-sm text-light">
            Mid solution
          </label>
          <textarea
            {...register(`practicalTaskSolutions.${index}.mediumSolution`)}
            className={`h-24 flex-1 rounded border-2 bg-white px-2 py-2 text-base ${
              error ? 'border-error_color' : 'border-light'
            }`}
            autoComplete="off"
            placeholder="Your mid solution here..."
            maxLength={500}
          />
        </div>
      ) : (
        <button
          className="place-self-start rounded-md bg-orange p-1 text-sm text-light"
          onClick={() => setShownSolutions((prevState) => ({ ...prevState, mediumSolution: true }))}>
          Add mid solution
        </button>
      )}
      {shownSolutions.bruteForceSolution ? (
        <div className="flex w-full gap-5">
          <label
            htmlFor={`practicalTaskSolutions.${index}.bruteForceSolution`}
            className="basis-1/6 text-sm text-light">
            Brute force solution
          </label>
          <textarea
            {...register(`practicalTaskSolutions.${index}.bruteForceSolution`)}
            className={`h-24 flex-1 rounded border-2 bg-white px-2 py-2 text-base ${
              error ? 'border-error_color' : 'border-light'
            }`}
            autoComplete="off"
            placeholder="Your brute force solution here..."
            maxLength={500}
          />
        </div>
      ) : (
        <button
          className="place-self-start rounded-md bg-orange p-1 text-sm text-light"
          onClick={() => setShownSolutions((prevState) => ({ ...prevState, bruteForceSolution: true }))}>
          Add brute force solution
        </button>
      )}
      <button type="button" onClick={handleRemove} className="text-light">
        <FaDeleteLeft size={20} />
      </button>
      {error?.root && <div className="text-error_color">{error.root.message}</div>}
    </div>
  );
};

export default PracitcalTaskSolutionListItem;
