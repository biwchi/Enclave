import { ProductsOrderig } from '@/constants/enums';
import { Product } from '@/services/products/types';
import { ApiParams, ResponseMeta } from '@/services/types';
import { create } from 'zustand';

export type ShopFilters = {
  priceMin?: number;
  priceMax?: number;
  brand?: string;
  rating?: number;
  category?: number;
  subCategory?: number;
  ordering?: ProductsOrderig;
} & ApiParams;

type ShopStore = {
  products: Product[];
  meta: ResponseMeta;
  filters: ShopFilters;
  setProducts: (products: Product[], meta?: ResponseMeta) => void;
  setFilters: (filters: ShopFilters) => void;
};

export const useShopStore = create<ShopStore>()((set) => ({
  products: [],
  meta: {
    count: 0,
    hasNext: false,
    hasPrevious: false,
    page: 0,
    page_count: 0,
    page_size: 0
  },
  filters: {
    page: 1,
    page_size: 20,
    priceMax: 4000,
    priceMin: 0,
    ordering: ProductsOrderig.RATING
  },

  setFilters: (filters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...filters
      }
    })),
  setProducts: (products, meta) =>
    set(() => ({
      products,
      meta
    }))
}));
