import { PropsWithChildren } from 'react';
import { defaultStyles } from '../../constants/defaultStyles';

interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
}

const test = 'bg-orange rounded-xl px-7.5 py-2 text-base text-white';

const Button = ({ className, children, onClick, type, disabled }: PropsWithChildren<ButtonProps>) => {
  return (
    <button onClick={onClick} className={test} type={type} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
