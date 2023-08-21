import ChevronIcon from '@/assets/ChevronIcon';
import { MouseEvent } from 'react';

const options = ['Smartphone', 'Laptop', 'TV', 'PC'];

type CategoriesNavBarProps = {
  selected: number;
  onHover: (event: MouseEvent<HTMLDivElement>, idx: number) => void;
  onLeave: () => void;
};

export default function CategoriesNavBar({ selected, onHover, onLeave }: CategoriesNavBarProps) {
  return (
    <div className="m-auto flex justify-center bg-primary-600">
      <div className="flex w-full max-w-[1400px] items-center justify-evenly">
        {options.map((category, idx) => {
          return (
            <div
              key={idx}
              onMouseEnter={(e) => onHover(e, idx)}
              onMouseLeave={onLeave}
              className="flex w-full cursor-pointer items-center justify-center gap-2 border-r border-solid border-primary-800 py-3 font-medium text-white last:border-none ">
              <p>{category}</p>
              <ChevronIcon color="#ffffff" rotate={selected !== idx} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
