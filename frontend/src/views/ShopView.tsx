import CartItem from '@/components/Common/CartItem';
import CartItemRow from '@/components/Common/CartItemRow';
import Loader from '@/components/Common/Loader';
import ShopPageFilters from '@/components/Shop/ShopPageFilters';
import ShopPageHeader from '@/components/Shop/ShopPageHeader';

import { useRest } from '@/services';
import { useShopStore } from '@/store/shopStore';
import { useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';

export default function ShopView() {
  const api = useRest();
  const [viewMode, setViewMode] = useState<'grid' | 'rows'>('rows');
  const [loading, setLoading] = useState(true);

  const { meta, products, setProducts, filters } = useShopStore();
  const filtersDebounce = useDebounce(filters, 400);

  async function get() {
    try {
      setLoading(true);
      const response = await api.products.getProducts({ ...filters, brand: filters.brand?.value });
      setProducts(response.results, response.meta);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    get();
  }, [filtersDebounce]);
  return (
    <div className="grid grid-cols-[272px,1fr] gap-5">
      <div>
        <ShopPageFilters />
      </div>
      <div>
        <ShopPageHeader
          productsCount={meta.count}
          viewMode={viewMode}
          changeMode={(mode) => setViewMode(mode)}
        />
        <div
          className={
            'placeholder relative mt-5 gap-5 ' + (viewMode === 'grid' ? 'grid grid-cols-4' : '')
          }>
          {loading && (
            <div className="absolute flex h-full w-full items-center justify-center rounded-3xl bg-black/10">
              <Loader />
            </div>
          )}
          {products.map((product) => {
            if (viewMode === 'grid') {
              return (
                <CartItem
                  id={product.id}
                  category={product.category.title}
                  title={product.title}
                  imageUrl={product.imageUrl}
                  price={product.price}
                  inWishlist={true}
                  inCart={false}
                />
              );
            } else {
              return (
                <CartItemRow
                  id={product.id}
                  category={product.category.title}
                  title={product.title}
                  imageUrl={product.imageUrl}
                  price={product.price}
                  description={product.description}
                  rating={3.4}
                  inWishlist={true}
                  inCart={false}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
