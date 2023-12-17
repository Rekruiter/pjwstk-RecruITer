import { FaStar } from 'react-icons/fa';

interface EmptyDisabledTaskProps {
  starsCount: number;
  handleOpenModal: () => void;
  question: string;
  technologies: string[];
}
const EmptyDisabledTask = ({ handleOpenModal, starsCount, question, technologies }: EmptyDisabledTaskProps) => {
  return (
    <div
      className="group flex cursor-pointer flex-col gap-2 rounded-md bg-dark/5 p-2 shadow-sm hover:scale-105 hover:bg-orange/70 hover:text-light/70"
      onClick={handleOpenModal}>
      <p className="font-semibold">{question}</p>
      <div className="flex justify-between">
        <div className="flex gap-2">
          {technologies.map((technology, index) => (
            <p key={index}>{technology}</p>
          ))}
        </div>
        <div className="inline-flex text-orange group-hover:text-light/70">
          {Array(starsCount)
            .fill(0)
            .map((_, index) => (
              <FaStar key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default EmptyDisabledTask;
