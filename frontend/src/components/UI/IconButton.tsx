import { ClassAttributes } from 'react';

type IconButtonProps = {
  icon: JSX.Element;
  background?: string;
  title?: string;
  text?: string;
  className?: string;
  onClick?: () => void;
};

export default function IconButton({
  icon,
  onClick,
  title,
  className,
  text,
  background = 'bg-transparent'
}: IconButtonProps) {
  return (
    <div title={title} className={className + ' flex items-center gap-2 font-medium ' + background}>
      <button onClick={onClick}>{icon}</button>
      <p>{text}</p>
    </div>
  );
}
