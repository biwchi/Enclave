import { ClassAttributes } from 'react';

type IconButtonProps = {
  icon: JSX.Element;
  background?: string;
  title?: string;
  text?: string;
  className?: string;
  selected?: boolean;
  onClick?: () => void;
};

export default function IconButton({
  icon,
  onClick,
  title,
  className = '',
  text,
  selected,
  background = ''
}: IconButtonProps) {
  return (
    <div
      title={title}
      onClick={onClick}
      className={
        className +
        ' flex cursor-pointer items-center justify-center gap-2 rounded-md p-2 font-medium transition ' +
        background +
        (selected ? ' bg-gray-200 ' : ' hover:bg-gray-100 ')
      }>
      <button>{icon}</button>
      {text && <p>{text}</p>}
    </div>
  );
}
