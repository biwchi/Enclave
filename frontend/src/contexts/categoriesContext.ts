import { Category } from '@/services/products/types';
import { createContext, useContext } from 'react';

export const CategoriesContext = createContext<Category[]>([]);

export function useCategiesContext() {
  const categories = useContext(CategoriesContext);
  return categories;
}
