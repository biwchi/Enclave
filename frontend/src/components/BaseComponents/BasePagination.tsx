import ChevronLightIcon from '@/assets/icons/ChevronLightIcon';

type BasePaginationProps = {
  pagesCount: number;
  selectedPage: number;
  updatePage: (page: number) => void;
};

export default function BasePagination({
  pagesCount,
  selectedPage,
  updatePage
}: BasePaginationProps) {
  const goPrev = () => {
    if (selectedPage !== 1) {
      updatePage(selectedPage - 1);
    }
  };

  const goNext = () => {
    if (selectedPage !== pagesCount) {
      updatePage(selectedPage + 1);
    }
  };

  function pages(): Array<string | number> {
    const totalBnts = 8;
    const firstPage = 1;
    const lastPage = pagesCount;

    const left = Math.floor(totalBnts / 2);
    const right = pagesCount - left + 1;

    const getRange = (from: number, to: number) =>
      Array.from({ length: to - from + 1 }).map((_, idx) => from + idx);

    if (pagesCount <= totalBnts) return getRange(1, pagesCount);

    if (selectedPage > left && selectedPage < right) {
      const from = selectedPage - left + 2;
      const to = selectedPage + left - 2;
      return [firstPage, '...', ...getRange(from, to), '...', lastPage];
    }

    if (selectedPage === left) {
      const to = selectedPage + left - 1;
      return [...getRange(firstPage, to), '...', lastPage];
    }

    if (selectedPage === right) {
      const from = selectedPage - left + 1;
      return [firstPage, '...', ...getRange(from, lastPage)];
    }

    return [...getRange(firstPage, left), '...', ...getRange(right, lastPage)];
  }

  return (
    <div className="flex items-center gap-3">
      <div
        className="flex cursor-pointer items-center justify-center rounded-full p-1 transition hover:bg-gray-200"
        onClick={goPrev}>
        <ChevronLightIcon height={25} width={25} className="rotate-90" />
      </div>
      <div className="flex gap-2">
        {pages().map((page, idx) => {
          return (
            <div
              key={idx}
              onClick={() => page !== '...' && updatePage(Number(page))}
              className={
                'flex h-6 w-6 items-center justify-center rounded-full p-4 text-sm transition ' +
                (selectedPage === page
                  ? 'cursor-default bg-primary-600 text-white'
                  : 'cursor-pointer bg-gray-100 text-gray-600 hover:bg-gray-200')
              }>
              {page}
            </div>
          );
        })}
      </div>
      <div
        className="flex cursor-pointer items-center justify-center rounded-full p-1 transition hover:bg-gray-200"
        onClick={goNext}>
        <ChevronLightIcon width={25} height={25} className="-rotate-90" />
      </div>
    </div>
  );
}
