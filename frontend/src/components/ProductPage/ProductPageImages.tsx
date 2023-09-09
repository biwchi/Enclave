import SearchIcon from '@/assets/icons/SearchIcon';
import { ProductContext } from '@/contexts/productContext';
import { useContext, useEffect, useRef, useState } from 'react';
import BaseIconButton from '../BaseComponents/BaseIconButton';
import ChevronLightIcon from '@/assets/icons/ChevronLightIcon';

export default function ProductPageImages() {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const imagesRef = useRef<HTMLDivElement | null>(null);
  const product = useContext(ProductContext);

  function onWheelSroll(e: WheelEvent) {
    if (!imagesRef.current) return;

    if (e.deltaY > 0) imagesRef.current.scrollLeft += 100;
    else imagesRef.current.scrollLeft -= 100;
  }

  useEffect(() => {
    if (!imagesRef.current) return;
    imagesRef.current.addEventListener('wheel', onWheelSroll);

    return () => {
      if (!imagesRef.current) return;
      imagesRef.current.removeEventListener('wheel', onWheelSroll);
    };
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <BaseIconButton
          className="absolute right-2 top-2 shadow-md"
          background="bg-white"
          icon={<SearchIcon />}
        />

        <img className="rounded-lg" src={product.imageUrl ?? ''} alt="" />
      </div>

      <div ref={imagesRef} className="relative flex flex-row gap-3 overflow-x-hidden">
        <div>
          <BaseIconButton
            className="absolute left-2 top-1/2 -translate-y-1/2 shadow-md"
            background="bg-white"
            icon={<ChevronLightIcon className="rotate-90" />}
          />
          <BaseIconButton
            className="absolute right-2 top-1/2 -translate-y-1/2 shadow-md"
            background="bg-white"
            icon={<ChevronLightIcon className="-rotate-90" />}
          />
        </div>

        {[1, 1].map((_, idx) => {
          return (
            <div
              onMouseEnter={() => setSelectedIdx(idx)}
              key={idx}
              className={
                'max-w-[calc(16.66667%-0.75rem)] cursor-pointer overflow-hidden rounded-md border border-solid p-1 ' +
                (selectedIdx === idx ? 'border-primary-500' : 'border-transparent')
              }>
              <img src={product.imageUrl ?? ''} alt="" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
