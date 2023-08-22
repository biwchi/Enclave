import { AxiosInstance } from 'axios';
import { BaseRest } from '../base';
import { ApiParams } from '../types';

export class ProductsRest extends BaseRest {
  constructor(endpoint: AxiosInstance) {
    super(endpoint);
  }

  public getProducts(params?: ApiParams) {
    return this.get('products', { params });
  }

  public getProduct(id: string, params: ApiParams) {
    return this.get(`products/${id}`, { params });
  }

  public postProduct(data: object, params: ApiParams) {
    return this.post('products', data, { params });
  }

  public deleteProduct(id: string, params: ApiParams) {
    return this.delete(`products/${id}`, { params });
  }

  public updateProduct(id: string, params: ApiParams) {
    return this.patch(`product/${id}`, { params });
  }
}
