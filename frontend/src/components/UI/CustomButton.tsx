import { ButtonHTMLAttributes } from 'react';
import CircleLoader from '../Common/CircleLoader';

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  rightIcon?: JSX.Element;
  colors?: {
    buttonColor: string;
    textColor: string;
  };
  loading?: boolean;
  variant?: 'outline' | 'solid';
}

export default function CustomButton({
  text,
  loading,
  rightIcon,
  colors = {
    buttonColor: 'primary',
    textColor: 'text-white'
  },
  variant = 'solid',
  ...buttonProps
}: CustomButtonProps) {
  function getVariant() {
    if (variant === 'solid') {
      return `bg-${colors.buttonColor}-600 border-${colors.buttonColor}-600 hover:bg-${colors.buttonColor}-700 focus:ring-${colors.buttonColor}-600  hover:border-${colors.buttonColor}-700`;
    }
    if (variant === 'outline') {
      return `bg-transparent border-${colors.buttonColor}-600 hover:bg-${colors.buttonColor}-700 focus:ring-${colors.buttonColor}-600 hover:border-${colors.buttonColor}-700`;
    }
  }
  return (
    <button
      {...buttonProps}
      className={
        getVariant() +
        ' ' +
        colors.textColor +
        ' flex h-full max-h-12 w-full items-center justify-center gap-1.5 rounded-full border border-solid px-4 py-4 transition-all focus:ring-2 '
      }>
      {loading ? <CircleLoader /> : <span className="font-medium">{text}</span>}
      {rightIcon}
    </button>
  );
}
