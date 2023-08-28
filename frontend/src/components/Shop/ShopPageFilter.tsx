import MdiChevronDown from '@/assets/icons/ChevronLightIcon';
import { Option, defineTitle } from '../UI/CustomSelect';
import CheckIcon from '@/assets/icons/CheckIcon';
import { useEffect, useRef, useState } from 'react';

type ShopPageFilterProps = {
  title: string;
  selected: Option | Option[] | undefined;
  options: Option[];
  showItemLength?: number;
  onSelect: (option: Option | undefined) => void;
};

export default function ShopPageFilter({
  title,
  selected,
  options,
  showItemLength = 4,
  onSelect
}: ShopPageFilterProps) {
  const [opened, setOpened] = useState(false);
  const optionsRef = useRef<HTMLUListElement | null>(null);
  const optionRef = useRef<HTMLLIElement | null>(null);
  const defaultShowCount = options.length <= showItemLength ? options.length : showItemLength;

  function checkSelected(option: Option) {
    if (typeof selected === 'object') {
      if (Array.isArray(selected)) {
        return selected.find((item) => JSON.stringify(item) === JSON.stringify(option));
      }
    }
    return JSON.stringify(selected) === JSON.stringify(option);
  }

  useEffect(() => {
    if (optionsRef.current && optionRef.current) {
      const height = optionRef.current?.scrollHeight;

      if (opened) {
        optionsRef.current.style.height = `${height * options.length}px`;
        return;
      }

      optionsRef.current.style.height = `${height * defaultShowCount}px`;
    }
  }, [opened]);

  return (
    <div className="my-5 rounded-md border border-solid border-gray-100 p-5">
      <h1 className="mb-5 font-medium">{title}</h1>

      <ul ref={optionsRef} className="overflow-hidden pl-2.5 transition-all">
        {options.map((option) => {
          return (
            <li
              ref={optionRef}
              onClick={() => (checkSelected(option) ? onSelect(undefined) : onSelect(option))}
              className="-ml-2.5 flex cursor-pointer items-center gap-3 rounded-md p-2.5 text-sm text-gray-700 hover:bg-gray-100">
              <div
                className={
                  'relative flex h-4 w-4 items-center justify-center rounded border-2 border-solid border-gray-700'
                }>
                {checkSelected(option) && (
                  <CheckIcon className="absolute text-gray-700" width={18} height={18} />
                )}
              </div>
              <p>{defineTitle(option)}</p>
            </li>
          );
        })}
      </ul>

      {options.length > showItemLength && (
        <div
          onClick={() => setOpened((val) => (val = !val))}
          className="mt-2.5 flex cursor-pointer select-none items-center gap-1 text-sm text-gray-700 hover:underline">
          <span>{opened ? 'Show less' : 'Show more'}</span>
          <div className={'transition-all ' + (opened ? 'rotate-180' : 'rotate-0')}>
            <MdiChevronDown />
          </div>
        </div>
      )}
    </div>
  );
}
