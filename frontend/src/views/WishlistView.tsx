import CartItem from '@/components/Common/CartItem';
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

  useEffect(() => {
    fetchUserWishList();
  }, []);

  return (
    <div>
      <h1 className="title">Wishlist</h1>

      <div className="grid mt-5 grid-cols-5 gap-3">
        {usersWishlist.map((product) => (
          <CartItem
            id={product.id}
            category={product.category}
            title={product.title}
            imageUrl={product.imageUrl}
            price={product.price}
            inWishlist={false}
            inCart={false}
          />
        ))}
      </div>
    </div>
  );
}
