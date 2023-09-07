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
  function pages(): string[] {
    const pages: number[] = [];

    const firstPage = 1;
    const lastPage = pagesCount;

    if (selectedPage !== lastPage - 3) {
      return [
        ...Array.from({ length: 8 }).map((_, idx) => (idx + selectedPage).toString()),
        '...',
        lastPage.toString()
      ];
    }

    
  }

  return (
    <div className="flex items-center gap-3">
      <div>
        <ChevronLightIcon height={25} width={25} className="rotate-90" />
      </div>
      <div className="flex gap-2">
        {pages().map((page) => {
          return (
            <div
              key={page}
              onClick={() => updatePage(parseInt(page))}
              className={
                'flex h-6 w-6 items-center justify-center rounded-full p-4 text-sm ' +
                (selectedPage === parseInt(page)
                  ? 'cursor-default bg-primary-600 text-white'
                  : 'cursor-pointer bg-gray-100 text-gray-600')
              }>
              {page}
            </div>
          );
        })}
      </div>
      <div>
        <ChevronLightIcon width={25} height={25} className="-rotate-90" />
      </div>
    </div>
  );
}
