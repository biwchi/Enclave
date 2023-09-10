import { useState } from 'react';

export default function ProductPageCounter() {
  const [counter, setCounter] = useState(1);

  return (
    <div className="flex w-48 items-center justify-between rounded-3xl border border-solid border-gray-200 px-3 py-2 text-gray-500">
      <span
        onClick={() => setCounter((v) => (v === 1 ? 1 : (v -= 1)))}
        className="cursor-pointer select-none text-2xl">
        -
      </span>
      <span className='text-xl font-medium'>{counter}</span>
      <span
        onClick={() => setCounter((v) => (v += 1))}
        className="cursor-pointer select-none text-2xl">
        +
      </span>
    </div>
  );
}
