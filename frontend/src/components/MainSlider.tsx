import { DragEvent, MouseEvent, useEffect, useRef, useState } from 'react';

type MainSliderProps = {
  slides: JSX.Element[];
};

export default function MainSlider({ slides }: MainSliderProps) {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const pressed = useRef(false);
  const sliderPosition = useRef({
    x: 0,
    lastX: 0
  });

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const mouseDown = (e: globalThis.MouseEvent) => {
      if (!wrapperRef.current || !sliderRef.current) return;
      pressed.current = true;
      sliderPosition.current.x = e.offsetX - wrapperRef.current.offsetLeft;
    };

    const mouseUp = () => {
      pressed.current = false;
      sliderPosition.current.lastX = sliderPosition.current.x;
      console.log(sliderPosition.current);
    };

    const mouseMove = (e: globalThis.MouseEvent) => {
      if (!wrapperRef.current || !sliderRef.current) return;
      if (!pressed.current) return;
      e.preventDefault();
      e.stopPropagation();
      wrapperRef.current.style.transform = `translateX(${sliderPosition.current.x}px)`;

      console.log(e);
    };

    sliderRef.current?.addEventListener('mousedown', mouseDown);
    sliderRef.current?.addEventListener('mousemove', (e) => mouseMove(e));
    sliderRef.current?.addEventListener('mouseup', mouseUp);

    return () => {
      sliderRef.current?.removeEventListener('mousedown', mouseDown);
      sliderRef.current?.removeEventListener('mousemove', mouseMove);
      sliderRef.current?.removeEventListener('mouseup', mouseUp);
    };
  }, []);

  return (
    <div ref={sliderRef} className="relative">
      <div className={'flex'} ref={wrapperRef}>
        {slides.map((slide, idx) => (
          <>{slide}</>
        ))}
      </div>
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2">
        <SliderPagination goTo={(idx) => setCurrent(idx)} current={current} count={slides.length} />
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
