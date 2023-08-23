import { AxiosInstance } from 'axios';
import { BaseRest } from '../base';
import { ApiParams, DefaultResponse } from '../types';
import { Category, Product } from './types';

export class ProductsRest extends BaseRest {
  constructor(endpoint: AxiosInstance) {
    super(endpoint);
  }

  public getProducts(params?: ApiParams) {
    return this.get<DefaultResponse<Product>>('products', { params });
  }

  public getCategories() {
    return this.get<DefaultResponse<Category>>('products/category');
  }

  public getProduct(id: string, params: ApiParams) {
    return this.get<Product>(`products/${id}`, { params });
  }

  public postProduct(data: object, params: ApiParams) {
    return this.post<Product>('products', data, { params });
  }

  public deleteProduct(id: string, params: ApiParams) {
    return this.delete<Product>(`products/${id}`, { params });
  }

  public updateProduct(id: string, params: ApiParams) {
    return this.patch<Product>(`product/${id}`, { params });
  }
}
