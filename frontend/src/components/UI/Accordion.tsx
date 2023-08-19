import { useState } from 'react';
import ChevronLightIcon from '@/assets/ChevronLightIcon';

type AccordionProps = {
  title: string;
  items: string[];
};

export default function Accordion({ title, items }: AccordionProps) {
  const [opened, setOpened] = useState(false);
  return (
    <div>
      <div
        onClick={() => setOpened((value) => (value = !value))}
        className="flex cursor-pointer select-none items-center justify-between">
        <h1 className="text-gray-900 text-sm font-medium">{title}</h1>
        <ChevronLightIcon className="transition" rotate={opened ? '180deg' : '0deg'} />
      </div>

      <div
        className={'mt-2 transition ' + (opened ? 'opacity-1 visible' : 'invisible h-0 opacity-0')}>
        {items.map((item) => {
          return (
            <div className="text-gray-500 cursor-pointer py-2 text-sm hover:underline">{item}</div>
          );
        })}
      </div>
    </div>
  );
}
