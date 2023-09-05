import CartItem from '@/components/Common/CartItem';
import Loader from '@/components/Common/Loader';
import ShopPageFilters from '@/components/Shop/ShopPageFilters';
import ShopPageHeader from '@/components/Shop/ShopPageHeader';

import { useRest } from '@/services';
import { useShopStore } from '@/store/shopStore';
import { useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';

export default function ShopView() {
  const [viewMode, setViewMode] = useState<'grid' | 'rows'>('rows');
  const [loading, setLoading] = useState(true);

  const { meta, products, setProducts, filters } = useShopStore();

  const api = useRest();
  const filtersDebounce = useDebounce(filters, 400);

  async function getProducts() {
    try {
      setLoading(true);

      const response = await api.products.getProducts({
        ...filters
      });

      setProducts(response.results, response.meta);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
    console.log(filtersDebounce)
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
            'placeholder relative mt-5 grid gap-3 ' + (viewMode === 'grid' && 'grid-cols-4')
          }>
          {loading && (
            <div className="full-center absolute justify-center rounded-3xl bg-black/10">
              <Loader />
            </div>
          )}
          {products.map((product, idx) => {
            if (viewMode === 'grid') {
              return (
                <CartItem
                  key={idx}
                  reviewsCount={product.reviewCount}
                  id={product.id}
                  category={product.category}
                  title={product.title}
                  imageUrl={product.imageUrl}
                  price={product.price}
                  description={product.description}
                  rating={product.rating}
                  subCategory={product.subCategory}
                  inWishlist={product.inWishlist ?? false}
                  inCart={false}
                />
              );
            } else {
              return (
                <CartItem
                  row
                  key={idx}
                  reviewsCount={product.reviewCount}
                  id={product.id}
                  category={product.category}
                  title={product.title}
                  imageUrl={product.imageUrl}
                  price={product.price}
                  description={product.description}
                  rating={product.rating}
                  subCategory={product.subCategory}
                  inWishlist={product.inWishlist ?? false}
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
