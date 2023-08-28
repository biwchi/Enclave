import ChevronIcon from '@/assets/icons/ChevronIcon';
import { ItemTitleValue } from '@/services/types';
import { useField } from 'formik';
import { useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

export type Option = ItemTitleValue | string | number;

type CustomSelectProps<T> = {
  selected?: T;
  placeholder?: string;
  options: T[];
  name?: string;
  label?: string;
  rouneded?: boolean;
  onSelect?: (option: T) => void;
};

export default function CustomSelect<T>({
  placeholder,
  selected,
  options,
  label,
  onSelect,
  rouneded = false
}: CustomSelectProps<T>) {
  const [opened, setOpened] = useState(false);
  const selectRef = useRef<HTMLDivElement | null>(null);

  function select(option: T) {
    onSelect && onSelect(option);
    setOpened(false);
  }

  useOnClickOutside(selectRef, () => setOpened(false));

  const optionsRender = options.map((option, idx) => {
    return (
      <div
        onClick={() => select(option)}
        key={idx}
        className={
          'cursor-pointe w-full cursor-pointer px-4 py-3 hover:bg-primary-100 ' +
          (JSON.stringify(option) === JSON.stringify(selected)
            ? 'bg-primary-100 font-medium'
            : 'bg-white')
        }>
        {defineTitle(option)}
      </div>
    );
  });

  return (
    <div className="relative w-48 border border-gray-100" ref={selectRef}>
      <input className="invisible hidden h-0 w-0 opacity-0" />
      {label && <h1 className="pb-1 pl-4 font-medium">{label}</h1>}
      <div
        onClick={() => setOpened((v) => (v = !v))}
        className={
          'flex cursor-pointer select-none items-center justify-between border border-solid border-gray-100 p-4 transition-all hover:bg-primary-100 ' +
          (opened
            ? `${rouneded && 'rounded-t-3xl'} bg-primary-100`
            : `${rouneded && 'rounded-3xl'} bg-white`)
        }>
        <h1>
          {defineTitle(selected) !== '' ? (
            defineTitle(selected)
          ) : (
            <span className="text-gray-500">{placeholder}</span>
          )}
        </h1>
        <ChevronIcon rotate={opened} />
      </div>
      <div
        className={
          'absolute z-50 flex max-h-60 w-full flex-col items-center overflow-auto bg-white shadow-lg transition last:rounded-b-2xl ' +
          (opened ? 'translate-y-0 opacity-100' : 'invisible translate-y-2 opacity-0')
        }>
        {optionsRender}
      </div>
    </div>
  );
}

export function defineTitle<T = Option>(option: T | undefined) {
  if (!option) return '';
  if (typeof option === 'object') {
    if ('title' in option) return option.title as string;
  } else return option.toString();
  return '';
}
