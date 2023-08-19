import ChevronIcon from '@/assets/ChevronIcon';
import { useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

type OptionObj = {
  title: string;
  value: string | number;
};

export type Option = OptionObj | string | number;

type CustomSelectProps = {
  selected: Option;
  placeholder: string;
  options: Option[];
  rouneded?: boolean;
  onSelect: (option: Option) => void;
};

export default function CustomSelect({
  placeholder,
  selected,
  options,
  onSelect,
  rouneded = false
}: CustomSelectProps) {
  const [opened, setOpened] = useState(false);
  const selectRef = useRef<HTMLDivElement | null>(null);

  function select(option: Option) {
    onSelect(option);
    setOpened(false);
  }

  function defineTitle(option: Option | string) {
    if (typeof option === 'object') return option.title;
    else return option.toString();
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
    <div className="relative w-48" ref={selectRef}>
      <div
        onClick={() => setOpened((v) => (v = !v))}
        className={
          'flex cursor-pointer select-none items-center justify-between p-4 hover:bg-primary-100 ' +
          (opened ? 'bg-primary-100' : 'bg-white')
        }>
        <div>{selected ? defineTitle(selected) : placeholder}</div>
        <ChevronIcon rotate={opened} />
      </div>
      <div
        className={
          'absolute z-50 flex max-h-60 w-full flex-col items-center overflow-auto bg-white shadow-lg transition last:rounded-b-2xl ' +
          (opened ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0 invisible')
        }>
        {optionsRender}
      </div>
    </div>
  );
}
