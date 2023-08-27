import { useCallback, useEffect, useRef, useState } from 'react';

type ShopPageSliderFiletrProps = {
  min: number;
  max: number;
  onChange: (values: { min: number; max: number }) => void;
};

export default function ShopPageSliderFilter({ min, max, onChange }: ShopPageSliderFiletrProps) {
  const [minVal, setMin] = useState(min);
  const [maxVal, setMax] = useState(max);

  const range = useRef<HTMLDivElement | null>(null);
  const minRange = useRef<HTMLInputElement | null>(null);
  const maxRange = useRef<HTMLInputElement | null>(null);

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    if (maxRange.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxRange.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    if (minRange.current) {
      const minPercent = getPercent(+minRange.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal]);

  return (
    <div className="relative">
      <input
        value={minVal}
        ref={minRange}
        min={min}
        max={max}
        onChange={(e) => {
          const value = Math.min(+e.target.value, maxVal - 1);
          setMin(value);
          e.currentTarget.value = value.toString();
        }}
        type="range"
        className={
          'thumb pointer-events-none absolute h-0 w-full  appearance-none outline-none ' +
          (minVal > max - 100 ? 'z-30' : 'z-[15]')
        }
      />
      <input
        value={maxVal}
        ref={maxRange}
        min={min}
        max={max}
        onChange={(e) => {
          const value = Math.max(+e.target.value, minVal + 1);
          setMax(value);
          e.currentTarget.value = value.toString();
        }}
        type="range"
        className="thumb pointer-events-none absolute z-20 h-0 w-full appearance-none outline-none"
      />
      <div className="relative w-full">
        <div ref={range} className="absolute z-10 h-1 rounded-sm bg-primary-600"></div>
        <div className="absolute h-1 w-full rounded-sm bg-gray-200"></div>
      </div>
    </div>
  );
}
