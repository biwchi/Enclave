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
  className = '',
  text,
  background = 'bg-transparent'
}: IconButtonProps) {
  return (
    <div
      title={title}
      onClick={onClick}
      className={
        className +
        ' flex items-center cursor-pointer justify-center gap-2 rounded-md p-2 font-medium transition hover:bg-gray-100 ' +
        background
      }>
      <button>{icon}</button>
      {text && <p>{text}</p>}
    </div>
  );
}
