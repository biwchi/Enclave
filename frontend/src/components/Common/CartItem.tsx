import CartIcon from '@/assets/icons/CartIcon';
import NoImageIcon from '@/assets/icons/NoImageIcon';
import FavoriteIcon from '@/assets/icons/favoriteIcon';
import { Review } from '@/services/products/types';

export type CartItemProps = {
  id: string;
  category: string;
  title: string;
  imageUrl: string | null;
  price: number;
  inWishlist: boolean;
  inCart: boolean;
};

export default function CartItem({
  category,
  title,
  imageUrl,
  price,
  inWishlist,
  inCart
}: CartItemProps) {
  return (
    <div className="rounded-md border border-solid border-gray-100 p-5">
      <h2 className="mb-5 text-xs text-gray-700">{category}</h2>
      <h1 className="text-sm font-medium text-primary-700">{title}</h1>

      <div className="h-72 py-5">
        <ImageCheck image={imageUrl} />
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">${price}</h2>
        <div>
          <button className="group/button relative rounded-full bg-primary-600 p-3 transition hover:bg-primary-700">
            <button className="group invisible absolute bottom-0 left-0 rounded-full bg-white p-3 opacity-0 shadow transition-all group-hover/button:visible group-hover/button:bottom-full group-hover/button:opacity-100">
              <FavoriteIcon
                height={20}
                width={20}
                className={
                  inWishlist
                    ? 'text-red-500 group-hover:text-gray-700'
                    : 'text-gray-700 group-hover:text-red-600'
                }
              />
              <div className="h-2 w-full"></div>
            </button>
            <CartIcon height={20} width={20} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function ImageCheck({ image }: { image: string | null }) {
  return image ? (
    <img src={image} alt="" />
  ) : (
    <div className="flex h-full w-full items-center justify-center rounded-md bg-primary-600">
      <NoImageIcon height={30} width={30} className="text-white" />
    </div>
  );
}
