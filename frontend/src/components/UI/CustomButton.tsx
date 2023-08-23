type CustomButtonProps = {
  text: string;
  rightIcon?: JSX.Element;
  colors?: {
    buttonColor: string;
    textColor: string;
  };
  variant?: 'outline' | 'solid';
};

export default function CustomButton({
  text,
  rightIcon,
  colors = {
    buttonColor: 'primary',
    textColor: 'text-white'
  },
  variant = 'solid'
}: CustomButtonProps) {
  function getVariat() {
    if (variant === 'solid') {
      return `bg-${colors.buttonColor}-600 border-${colors.buttonColor}-600 hover:bg-${colors.buttonColor}-700 hover:border-${colors.buttonColor}-700`;
    } 
    if (variant === 'outline') {
      return `bg-transparent border-${colors.buttonColor}-600 hover:bg-${colors.buttonColor}-700 hover:border-${colors.buttonColor}-700`;
    }
  }
  return (
    <button
      className={
        getVariat() +
        ' ' +
        colors.textColor +
        ' flex w-full items-center justify-center gap-1.5 rounded-full border border-solid px-3 py-2 transition-all '
      }>
      <span>{text}</span>
      {rightIcon}
    </button>
  );
}
