import { ProductContext } from '@/contexts/productContext';
import { useContext } from 'react';
import RatingStart from '../BaseComponents/RatingStars';
import ColorPicker from '../BaseComponents/ColorPicker';

export default function ProductPageDetails() {
  const product = useContext(ProductContext);

  return (
    <div>
      <span>{product.category.title}</span>

      <h1 className="title pb-5 pt-5 text-primary-600">{product.title}</h1>

      <div className="flex flex-col gap-5">
        <RatingStart rating={product.rating} reviewsCount={product.reviewCount} />
        <p>{product.description}</p>
        <ColorPicker onSelect={() => {}} />
      </div>
    </div>
  );
}
