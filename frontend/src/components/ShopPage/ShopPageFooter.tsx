import { useShopStore } from '@/store/shopStore';
import BasePagination from '../BaseComponents/BasePagination';

export default function ShopPageFooter() {
  const { filters, meta, setFilters } = useShopStore();
  return (
    <div className="flex items-center justify-between rounded-md border border-solid border-gray-100 p-5">
      <div>
        <span className="text-gray-700">Showing</span>
        <b className="px-1">1-{filters.page_size}</b>
        <span className="text-gray-700">of</span>
        <b className="px-1">{meta.count}</b>
      </div>
      {meta.page_count > 1 && (
        <BasePagination
          pagesCount={meta.page_count}
          selectedPage={filters.page ?? 1}
          updatePage={(page) => setFilters({ page })}
        />
      )}
    </div>
  );
}
