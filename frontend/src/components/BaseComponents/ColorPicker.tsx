import { Colors } from '@/constants/Colors';
import { useState } from 'react';

export default function ColorPicker() {
  const [selected, setSelected] = useState<keyof typeof Colors | null>(null);

  const colors = Object.keys(Colors) as Array<keyof typeof Colors>;

  return (
    <div>
      <h1 className="mb-5 font-medium">Colors</h1>

      <div className="flex flex-wrap gap-2">
        {colors.map((color, idx) => {
          return (
            <div
              onClick={() => setSelected(color)}
              key={idx}
              className={
                ' relative h-9 w-9 cursor-pointer overflow-hidden rounded-md border-2 border-solid border-gray-200 bg-primary-600 transition-all duration-300 ' +
                (selected == color && 'p-1')
              }>
              <div className={' w-ful h-full ' + (selected === color && 'rounded-sm')} style={{ backgroundColor: Colors[color] }}></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
