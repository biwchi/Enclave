import CheckIconColor from '@/assets/icons/CheckIconColor';
import { Colors } from '@/constants/Colors';
import { useEffect, useState } from 'react';

type ColorPickerProps = {
  onSelect: (color: keyof typeof Colors | null) => void;
};

export default function ColorPicker(props: ColorPickerProps) {
  const { onSelect } = props;
  const [selected, setSelected] = useState<keyof typeof Colors | null>(null);

  const colors = Object.keys(Colors) as Array<keyof typeof Colors>;
  const select = (color: keyof typeof Colors) =>
    color === selected ? setSelected(null) : setSelected(color);

  useEffect(() => onSelect(selected));

  return (
    <div>
      <h1 className="mb-5 font-medium">Colors</h1>

      <div className="flex flex-wrap gap-2">
        {colors.map((color, idx) => {
          return (
            <div
              onClick={() => select(color)}
              key={idx}
              className={
                'relative h-9 w-9 cursor-pointer overflow-hidden rounded-md border-2 border-solid border-gray-100 bg-primary-600 transition-all '
              }>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
                <CheckIconColor
                  className={
                    'transition-all ' +
                    (color == 'WHITE' ? 'fill-black' : 'fill-white') +
                    ' ' +
                    (selected == color ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0')
                  }
                />
              </div>
              <div
                className={' w-ful h-full ' + (selected === color && 'rounded-sm')}
                style={{ backgroundColor: Colors[color] }}></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
