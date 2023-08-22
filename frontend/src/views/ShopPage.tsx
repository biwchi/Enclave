import ShopPageFilters from '@/components/Shop/ShopPageFilters';
import ShopPageHeader from '@/components/Shop/ShopPageHeader';
import { useRest } from '@/services';
import { useEffect } from 'react';

export default function ShopPage() {
  const api = useRest();
  async function get() {
    const response = await api.products.getProducts();
    console.log(response);
  }
  useEffect(() => {
    get();
  }, []);
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
