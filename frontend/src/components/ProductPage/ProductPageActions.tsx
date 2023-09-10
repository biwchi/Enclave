import FavoriteIcon from '@/assets/icons/favoriteIcon';
import BaseBadge from '../BaseComponents/BaseBadge';
import BaseButton from '../BaseComponents/BaseButton';
import CompareIcon from '@/assets/icons/CompareIcon';
import { useContext } from 'react';
import { ProductContext } from '@/contexts/productContext';
import ProductPageCounter from './ProductPageCounter';
import CartIcon from '@/assets/icons/CartIcon';

export default function ProductPageActions() {
  const product = useContext(ProductContext);

  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <p className="text-gray-500">Stock:</p>
        <BaseBadge text="26" />
      </div>

      <div className="my-5 h-[1px] w-full bg-gray-200"></div>

      <div className="flex gap-2">
        <BaseButton text="Compare" rightIcon={<CompareIcon />} variant={'outline'} />
        <BaseButton text="Wishlist" rightIcon={<FavoriteIcon />} variant={'outline'} />
      </div>

      <h1 className="title py-5">${product.price}</h1>
      <ProductPageCounter />

      <BaseButton className='mt-5' text="Add to cart" rightIcon={<CartIcon />} />
    </div>
  );
}
