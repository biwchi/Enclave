import ProductCard from '@/components/Common/ProductCard';
import Loader from '@/components/Common/Loader';
import ShopPageFilters from '@/components/Shop/ShopPageFilters';
import ShopPageHeader from '@/components/Shop/ShopPageHeader';

import { useRest } from '@/services';
import { useShopStore } from '@/store/shopStore';
import { useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import ShopPageFooter from '@/components/Shop/ShopPageFooter';

export default function ShopView() {
  const [viewMode, setViewMode] = useState<'grid' | 'rows'>('rows');
  const [loading, setLoading] = useState(true);

  const { meta, products, filters, setProducts, setFilters } = useShopStore();

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
    console.log(filtersDebounce);
  }, [filtersDebounce]);

  useEffect(() => {
    return () => {
      setFilters({ ...filters, category: undefined, subCategory: undefined });
    };
  }, []);

  return (
    <div className="grid grid-cols-[272px,1fr] gap-5">
      <ShopPageFilters />
      <div>
        <ShopPageHeader
          productsCount={meta.count}
          viewMode={viewMode}
          changeMode={(mode) => setViewMode(mode)}
        />
        <div
          className={
            'placeholder relative my-5 grid gap-3 ' + (viewMode === 'grid' && 'grid-cols-4')
          }>
          {loading && (
            <div className="full-center absolute justify-center rounded-3xl bg-black/10">
              <Loader />
            </div>
          )}
          {products.map((product, idx) => {
            if (viewMode === 'grid') {
              return (
                <ProductCard
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
                <ProductCard
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
        <ShopPageFooter />
      </div>
    </div>
  );
}
