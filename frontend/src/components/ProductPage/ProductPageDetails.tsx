import { ProductContext } from '@/contexts/productContext';
import { useContext } from 'react';
import RatingStart from '../BaseComponents/RatingStars';
import ColorPicker from '../BaseComponents/ColorPicker';

export default function ProductPageDetails() {
  const product = useContext(ProductContext);

  return (
    <div>
      <span>{product.category.title}</span>

      <h1 className="title text-primary-600">{product.title}</h1>

      <div>
        <RatingStart rating={product.rating} reviewsCount={product.reviewCount} />
        <p>{product.description}</p>
        <ColorPicker />
      </div>
    </div>
  );
}
