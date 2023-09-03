import { AxiosInstance } from 'axios';
import { BaseRest } from '../base';
import { DefaultResponse } from '../types';
import { Product } from '../products/types';

export class WishlistRest extends BaseRest {
  constructor(endpoint: AxiosInstance) {
    super(endpoint);
  }

  getWishlistProducts() {
    return this.get<DefaultResponse<Product>>('wishlist');
  }

  addToWishlist(id: string) {
    return this.post(`wishlist/${id}`);
  }
}
