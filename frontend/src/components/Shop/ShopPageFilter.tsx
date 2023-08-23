import MdiChevronDown from '@/assets/icons/ChevronLightIcon';
import { Option, defineTitle } from '../UI/CustomSelect';
import CheckIcon from '@/assets/icons/CheckIcon';

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
    <div className="my-5 rounded-md border border-solid border-gray-100 p-5">
      <h1 className="font-medium ">{title}</h1>

      <ul>
        {options.map((option) => {
          return (
            <li
              onClick={() => onSelect(option)}
              className="-ml-2.5 flex cursor-pointer items-center gap-3 rounded-md p-2.5 text-sm text-gray-700 first:mt-5 hover:bg-gray-100">
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

      <div className="mt-2.5 flex cursor-pointer items-center gap-1 text-sm text-gray-700 hover:underline">
        <span>Show more</span>
        <MdiChevronDown />
      </div>
    </div>
  );
}
