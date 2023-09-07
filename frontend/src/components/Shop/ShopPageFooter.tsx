import { useShopStore } from '@/store/shopStore';
import BasePagination from '../UI/BasePagination';

export default function ShopPageFooter() {
  const { filters, setFilters } = useShopStore();

  return (
    <div className="flex items-center justify-between rounded-md border border-solid border-gray-100 p-5">
      <p>Lorem, ipsum dolor.</p>
      <BasePagination
        pagesCount={30}
        selectedPage={filters.page ?? 1}
        updatePage={(page) => setFilters({ page })}
      />
    </div>
  );
}
