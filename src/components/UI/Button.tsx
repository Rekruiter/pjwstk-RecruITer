import { PropsWithChildren } from 'react';
import { defaultStyles } from '../../constants/defaultStyles';

interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
}

const Button = ({ className, children, onClick, type, disabled }: PropsWithChildren<ButtonProps>) => {
  return (
    <button onClick={onClick} className={`${defaultStyles.orangeButton} ${className}`} type={type} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
