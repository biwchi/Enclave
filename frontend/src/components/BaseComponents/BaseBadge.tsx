import { VariantProps, cva } from 'class-variance-authority';

const badgeStyles = cva('rounded-full px-1.5 text-sm', {
  variants: {
    variant: {
      red: 'bg-pink-100 text-pink-600'
    },
    size: {
      default: ''
    }
  },
  defaultVariants: {
    variant: 'red',
    size: 'default'
  }
});

type BaseBadgesProps = {
  text: string;
} & VariantProps<typeof badgeStyles>;

export default function BaseBadges(props: BaseBadgesProps) {
  const { text, variant, size } = props;
  return <span className={badgeStyles({ variant, size })}>{text}</span>;
}
