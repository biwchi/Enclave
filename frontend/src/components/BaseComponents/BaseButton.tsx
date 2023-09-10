import { ButtonHTMLAttributes } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import CircleLoader from '../Common/CircleLoader';

const button = cva(
  'flex h-full max-h-12 w-full items-center justify-center gap-1.5 rounded-full transition-all font-medium',
  {
    variants: {
      variant: {
        outline:
          'bg-transparent border border-solid border-gray-500 text-gray-500 hover:bg-gray-200',
        primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-2',
        inWishlist: 'bg-red-600 text-red-200 hover:bg-red-700',
        toWishlist:
          'bg-transparent border border-solid border-gray-500 text-gray-500 hover:bg-gray-200'
      },
      size: {
        medium: ['px-4 py-4']
      }
    },
    compoundVariants: [
      {
        variant: 'primary',
        size: 'medium'
      }
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'medium'
    }
  }
);

type CustomButtonProps = {
  text: string;
  rightIcon?: JSX.Element;
  loading?: boolean;
  background?: string;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button>;

export default function BaseButton({
  text,
  loading,
  rightIcon,
  background,
  className,
  variant,
  size,
  ...buttonProps
}: CustomButtonProps) {
  return (
    <button {...buttonProps} className={button({ className, variant, size })}>
      {loading ? <CircleLoader /> : <span>{text}</span>}
      {rightIcon}
    </button>
  );
}
