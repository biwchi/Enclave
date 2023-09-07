import ProductCard from '@/components/Common/ProductCard';
import { useRest } from '@/services';
import { Product } from '@/services/products/types';
import { useEffect, useState } from 'react';

export default function WishlistView() {
  const api = useRest();
  const [usersWishlist, setUserWishlist] = useState<Product[]>([]);

  async function fetchUserWishList() {
    try {
      const products = await api.wishlist.getWishlistProducts();

      setUserWishlist(products.results);
    } catch (error) {}
  }

  function handleRemove(id: string) {
    setUserWishlist(usersWishlist.filter((product) => product.id !== id));
  }

  useEffect(() => {
    fetchUserWishList();
  }, []);

  return (
    <div>
      <h1 className="title">Wishlist</h1>

      <div className="mt-5 grid grid-cols-5 gap-3">
        {usersWishlist.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            category={product.category}
            title={product.title}
            imageUrl={product.imageUrl}
            price={product.price}
            inWishlist={product.inWishlist ?? false}
            onRemoveWishlist={(id) => handleRemove(id)}
            inCart={false}
            rating={0}
            reviewsCount={0}
          />
        ))}
      </div>
    </div>
  );
}
