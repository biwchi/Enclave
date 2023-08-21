import ShopPageFilters from '@/components/Shop/ShopPageFilters';
import ShopPageHeader from '@/components/Shop/ShopPageHeader';

export default function ShopPage() {
  return (
    <div className="grid grid-cols-[272px,1fr] gap-5">
      <div>
        <ShopPageFilters />
      </div>
      <div>
        <ShopPageHeader />
      </div>
    </div>
  );
}
