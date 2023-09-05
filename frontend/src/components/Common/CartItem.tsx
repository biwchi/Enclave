import CartIcon from '@/assets/icons/CartIcon';
import NoImageIcon from '@/assets/icons/NoImageIcon';
import FavoriteIcon from '@/assets/icons/favoriteIcon';
import { useRest } from '@/services';
import { Category, SubCategory } from '@/services/products/types';
import { Link } from 'react-router-dom';
import CustomButton from '../UI/CustomButton';
import RatingStart from '../UI/RatingStars';
import { useState } from 'react';

export type CartItemProps = {
  id: string;
  category: Category;
  title: string;
  imageUrl: string | null;
  price: number;
  rating: number;
  reviewsCount: number;
  description?: string;
  subCategory?: SubCategory;
  inWishlist: boolean;
  inCart: boolean;
  row?: boolean;
  onAddWishlist?: (productId: string) => void;
  onRemoveWishlist?: (productId: string) => void;
};

export default function CartItem({
  id,
  category,
  title,
  imageUrl,
  price,
  inWishlist,
  description,
  reviewsCount,
  rating,
  row,
  onAddWishlist,
  onRemoveWishlist
}: CartItemProps) {
  const api = useRest();

  const [wishlist, setWishlist] = useState(inWishlist);

  async function addToWishList() {
    try {
      api.wishlist.addToWishlist(id);
      setWishlist(true);
      onAddWishlist && onAddWishlist(id);
    } catch (error) {
      console.error(error);
    }
  }

  async function removeFormWishlist() {
    try {
      api.wishlist.removeFromWishlist(id);
      setWishlist(false);
      onRemoveWishlist && onRemoveWishlist(id);
    } catch (error) {
      console.error(error);
    }
  }

  if (row) {
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
        <div className="flex flex-col gap-2 self-center">
          <h1 className="py-5 text-2xl font-medium">${price}</h1>
          <CustomButton
            onClick={wishlist ? removeFormWishlist : addToWishList}
            background={
              wishlist
                ? 'bg-red-600 hover:bg-gray-600 text-white ring-red-300'
                : 'bg-gray-300 hover:bg-red-600 text-gray-500 ring-gray-300 hover:text-white'
            }
            rightIcon={<FavoriteIcon />}
            text="Wishlist"
          />
          <CustomButton rightIcon={<CartIcon />} text="Add to cart" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-md border border-solid border-gray-100 p-5">
      <h2 className="mb-5 text-xs text-gray-700">{category.title}</h2>
      <h1 className="line-clamp-2 flex-auto text-sm font-medium text-primary-700">{title}</h1>

      <div className="my-5 h-52">
        <ImageCheck image={imageUrl} />
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">${price}</h2>
        <div className="group/button relative">
          <button
            onClick={wishlist ? removeFormWishlist : addToWishList}
            className="group invisible absolute bottom-0 left-0 scale-75 rounded-full bg-white p-3 opacity-0 shadow transition-all hover:bg-gray-100 group-hover/button:visible group-hover/button:bottom-full group-hover/button:scale-100 group-hover/button:opacity-100">
            <FavoriteIcon
              height={20}
              width={20}
              className={wishlist ? 'text-red-500' : 'text-gray-700'}
            />
          </button>
          <div className="h-2"></div>
          <button className="relative rounded-full bg-primary-600 p-3 transition hover:bg-primary-700">
            <CartIcon height={20} width={20} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function ImageCheck({ image }: { image: string | null }) {
  return image ? (
    <img className="m-auto h-52" src={image} alt="" />
  ) : (
    <div className="flex h-full w-full items-center justify-center rounded-md bg-primary-600">
      <NoImageIcon height={30} width={30} className="text-white" />
    </div>
  );
}
