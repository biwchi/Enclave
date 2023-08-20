import { DragEvent, MouseEvent, useRef, useState } from 'react';

type MainSliderProps = {
  slides: JSX.Element[];
};

export default function MainSlider({ slides }: MainSliderProps) {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  let current = 0;
  let sliderPosition = 0;
  let pressed = false;

  const mouseUp = () => (pressed = false);

  function onDragEvent(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    if (!wrapperRef.current || !sliderRef.current) return;
    if (!pressed) return;
    wrapperRef.current.style.translate = e.currentTarget.offsetLeft - sliderPosition + 'px';
    console.log(e.currentTarget.offsetLeft - sliderPosition + 'px')
  }

  function onMouseDown(e: MouseEvent<HTMLDivElement>) {
    if (!wrapperRef.current || !sliderRef.current) return;
    pressed = true;
    sliderPosition = e.currentTarget.offsetLeft - wrapperRef.current.offsetLeft;
  }

  return (
    <div ref={sliderRef} className="relative">
      <div
        className={'flex'}
        ref={wrapperRef}
        onMouseDown={(e) => onMouseDown(e)}
        onMouseUp={mouseUp}
        onMouseMove={(e) => onDragEvent(e)}>
        {slides.map((slide, idx) => (
          <div key={idx}>{slide}</div>
        ))}
      </div>
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2">
        <SliderPagination goTo={(idx) => (current = idx)} current={current} count={slides.length} />
      </div>
    </div>
  );
}

function SliderPagination({
  count,
  current,
  goTo
}: {
  count: number;
  current: number;
  goTo: (idx: number) => void;
}) {
  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length: count }).map((_dot, idx) => {
        return (
          <div
            key={idx}
            onClick={() => goTo(idx)}
            className={
              'h-3 cursor-pointer rounded-full transition-all ' +
              (current === idx ? 'w-6 bg-primary-700' : 'w-3 bg-gray-500')
            }></div>
        );
      })}
    </div>
  );
}
