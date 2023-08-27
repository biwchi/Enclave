import { ProductsOrderig } from '@/constants/enums';
import { Category, Product } from '@/services/products/types';
import { ItemTitleValue, Ordering, ResponseMeta } from '@/services/types';
import { create } from 'zustand';

export type ShopFilters = {
  priceMin?: number;
  priceMax?: number;
  brand?: ItemTitleValue;
  rating?: number;
  ordering: ProductsOrderig;
};

type ShopStore = {
  products: Product[];
  categories: Category[];
  meta: ResponseMeta;
  filters: ShopFilters;
  setProducts: (products: Product[], meta?: ResponseMeta) => void;
  setCategories: (categories: Category[]) => void;
  setFilters: (filters: ShopFilters) => void;
};

export const useShopStore = create<ShopStore>()((set) => ({
  products: [],
  categories: [],
  meta: {
    count: 0,
    hasNext: false,
    hasPrevious: false,
    page: 0,
    page_count: 0,
    page_size: 0
  },
  filters: {
    ordering: ProductsOrderig.POPUlAR
  },

  setCategories: (categories) =>
    set(() => ({
      categories
    })),
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
