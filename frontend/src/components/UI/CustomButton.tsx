import { ButtonHTMLAttributes } from 'react';
import CircleLoader from '../Common/CircleLoader';

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  rightIcon?: JSX.Element;
  loading?: boolean;
  background?: string;
}

export default function CustomButton({
  text,
  loading,
  rightIcon,
  background,
  ...buttonProps
}: CustomButtonProps) {
  return (
    <button
      {...buttonProps}
      className={
        'flex h-full max-h-12 w-full items-center justify-center gap-1.5 rounded-full px-4 py-4 transition-all focus:ring-2 ' +
        (background ? background : 'bg-primary-600 text-white hover:bg-primary-700')
      }>
      {loading ? <CircleLoader /> : <span className="font-medium">{text}</span>}
      {rightIcon}
    </button>
  );
}
