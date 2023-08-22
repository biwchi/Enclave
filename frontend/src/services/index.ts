import axios from 'axios';
import { ProductsRest } from './products';

class Rest {
  public readonly products;

  private endpoint;

  constructor() {
    this.endpoint = this.createAxios();

    this.products = new ProductsRest(this.endpoint);
  }

  private createAxios() {
    return axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
  }
}

export const useRest = () => {
  const api = new Rest();
  return api;
};
