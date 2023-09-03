import FavoriteIcon from '@/assets/icons/favoriteIcon';
import CustomButton from '../UI/CustomButton';
import RatingStart from '../UI/RatingStars';
import CartIcon from '@/assets/icons/CartIcon';

import { CartItemProps, ImageCheck } from './CartItem';
import { Link } from 'react-router-dom';
import { SubCategory } from '@/services/products/types';
import { useRest } from '@/services';

type CartItemRowProps = {
  rating: number;
  id: string;
  reviewsCount: number;
  description?: string;
  subCategory?: SubCategory;
} & CartItemProps;

export default function CartItemRow({
  title,
  price,
  description,
  imageUrl,
  reviewsCount,
  category,
  id,
  rating
}: CartItemRowProps) {
  const api = useRest();

  async function addToWishList() {
    try {
      api.wishlist.addToWishlist(id);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="grid grid-cols-[0.3fr,1fr,0.3fr] border border-solid border-gray-100 p-5">
      <div className="h-60 w-60">
        <Link to={`product/${id}`}>
          <ImageCheck image={imageUrl} />
        </Link>
      </div>
      <div className="flex-auto px-5">
        <h2 className="text-xs text-gray-700">{category.title}</h2>
        <Link
          to={`product/${id}`}
          className="block cursor-pointer py-5 font-medium text-primary-700  underline-offset-1 hover:underline">
          {title}
        </Link>
        <RatingStart reviewsCount={reviewsCount} rating={rating} />
        <p className="pt-5 text-sm text-gray-700">{description}</p>
      </div>
      <div className="self-center">
        <CustomButton
          onClick={addToWishList}
          variant="outline"
          rightIcon={<FavoriteIcon />}
          colors={{ buttonColor: 'gray', textColor: 'text-gray-600' }}
          text="Wishlist"
        />
        <h1 className="py-5 text-2xl font-medium">${price}</h1>
        <CustomButton rightIcon={<CartIcon />} text="Add to cart" />
      </div>
    </div>
  );
}
