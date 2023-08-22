import MdiChevronDown from '@/assets/ChevronLightIcon';
import { Option, defineTitle } from '../UI/CustomSelect';
import CheckIcon from '@/assets/CheckIcon';

type ShopPageFilterProps = {
  title: string;
  selected: Option | Option[];
  options: Option[];
  onSelect: (option: Option) => void;
};

export default function ShopPageFilter({
  title,
  selected,
  options,
  onSelect
}: ShopPageFilterProps) {
  function checkSelected(option: Option) {
    if (typeof selected === 'object') {
      if (Array.isArray(selected)) {
        return selected.find((item) => JSON.stringify(item) === JSON.stringify(option));
      }
    }
    return JSON.stringify(selected) === JSON.stringify(option);
  }

  return (
    <div className="rounded-md border border-solid border-gray-100 p-5 my-5">
      <h1 className="font-medium ">{title}</h1>

      <ul>
        {options.map((option) => {
          return (
            <li
              onClick={() => onSelect(option)}
              className="flex cursor-pointer items-center gap-3 pb-5 text-sm text-gray-700 first:pt-5">
              <div
                className={
                  'relative flex h-4 w-4 items-center justify-center rounded border-2 border-solid border-gray-700'
                }>
                {checkSelected(option) && <CheckIcon className="absolute" width={16} height={16} />}
              </div>
              <p>{defineTitle(option)}</p>
            </li>
          );
        })}
      </ul>

      <div className="flex cursor-pointer items-center gap-1 text-sm text-gray-700">
        <span>Show more</span>
        <MdiChevronDown />
      </div>
    </div>
  );
}
