import { ButtonHTMLAttributes } from 'react';
import CircleLoader from '../Common/CircleLoader';
import { VariantProps, cva } from 'class-variance-authority';

<button
{...buttonProps}
className={
  'flex h-full max-h-12 w-full items-center justify-center gap-1.5 rounded-full px-4 py-4 transition-all focus:ring-2 ' +
  (background ? background : 'bg-primary-600 text-white hover:bg-primary-700')
}>


const button = cva('button', {
  variants: {
    intent: {
      primary: []
    },
    size: {
      medium: [' h-full max-h-12 w-full']
    }
  },
  compoundVariants: [{ intent: 'primary', size: 'medium', class: 'uppercase' }],
  defaultVariants: {
    intent: 'primary',
    size: 'medium'
  }
});

interface CustomButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
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
  className,
  intent,
  size,
  ...buttonProps
}: CustomButtonProps) {
  return (
    <button {...buttonProps} className={button({ className, intent, size })}>
      {loading ? <CircleLoader /> : <span className="font-medium">{text}</span>}
      {rightIcon}
    </button>
  );
}
