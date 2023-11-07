import { PropsWithChildren } from 'react';

interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
}

const Button = ({ className, children, onClick, type, disabled }: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      onClick={onClick}
      className={`bg-orange px-7.5 py-2 rounded-xl flex flex-col gap-1 items-center justify-center text-base text-white ${className}`}
      type={type}
      disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
