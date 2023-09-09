import { Product } from '@/services/products/types';
import { createContext } from 'react';

export const ProductContext = createContext<Product>({
  id: '',
  title: '',
  description: '',
  imageUrl: null,
  price: 0,
  rating: 0,
  reviewCount: 0,
  category: {
    id: 0,
    title: '',
    totalProducts: 0,
    subCategories: []
  },
  updated_at: new Date(),
  create_at: new Date(),
  subCategory: {
    id: 0,
    title: '',
    totalProducts: 0
  },
  inWishlist: null
});
