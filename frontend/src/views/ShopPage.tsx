import CartItem from '@/components/Common/CartItem';
import CartItemRow from '@/components/Common/CartItemRow';
import ShopPageFilters from '@/components/Shop/ShopPageFilters';
import ShopPageHeader from '@/components/Shop/ShopPageHeader';

import { useRest } from '@/services';
import { useShopStore } from '@/store/shopStore';
import { useEffect, useState } from 'react';

export default function ShopPage() {
  const shopStore = useShopStore();
  const [viewMode, setViewMode] = useState<'grid' | 'rows'>('grid');

  const meta = shopStore.meta;
  const products = shopStore.products;
  const api = useRest();

  async function get() {
    const response = await api.products.getProducts();
    shopStore.setProducts(response.results, response.meta);
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
        <ShopPageHeader
          productsCount={meta.count}
          viewMode={viewMode}
          changeMode={(mode) => setViewMode(mode)}
        />
        <div
          className={'placeholder mt-5 gap-5 ' + (viewMode === 'grid' ? 'grid grid-cols-4' : '')}>
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
