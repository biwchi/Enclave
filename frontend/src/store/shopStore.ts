import { Product } from '@/services/products/types';
import { ResponseMeta } from '@/services/types';
import { create } from 'zustand';

type ShopStore = {
  products: Product[];
  meta: ResponseMeta;
  setProducts: (products: Product[], meta?: ResponseMeta) => void;
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
  setProducts: (products, meta) =>
    set(() => ({
      products,
      meta
    }))
}));
