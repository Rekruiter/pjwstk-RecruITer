import { PropsWithChildren } from 'react';

interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
}

const Button = ({ className, children, onClick }: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      onClick={onClick}
      className={`bg-orange px-7.5 py-2 rounded-xl flex gap-1 items-center text-base text-white ${className}`}>
      {children}
    </button>
  );
};

export default Button;
