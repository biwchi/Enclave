import { ClassAttributes } from 'react';

type IconButtonProps = {
  icon: JSX.Element;
  background?: string;
  title?: string;
  className?: string;
  onClick?: () => void;
};

export default function IconButton({
  icon,
  onClick,
  title,
  className,
  background = 'bg-transparent'
}: IconButtonProps) {
  return (
    <div title={title} className={className + ' ' + background}>
      <button onClick={onClick}>{icon}</button>
    </div>
  );
}
