import axios from 'axios';
import { ProductsRest } from './products';
import { UserRest } from './user';
import { useReadLocalStorage } from 'usehooks-ts';
import { WishlistRest } from './wishlist';

class Rest {
  public readonly products;
  public readonly user;
  public readonly wishlist;

  private endpoint;

  constructor() {
    this.endpoint = this.createAxios();

    this.user = new UserRest(this.endpoint);
    this.products = new ProductsRest(this.endpoint);
    this.wishlist = new WishlistRest(this.endpoint);

    this.axiosReqInterceptor();
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

  private axiosReqInterceptor() {
    this.endpoint.interceptors.request.use(
      (config) => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
          config.headers.setAuthorization(`Bearer ${accessToken.replace(/"/g, '')} `, true);
        }

        return config;
      },
      (error) => Promise.reject(error)
    );
  }
}

export const useRest = () => {
  const api = new Rest();
  return api;
};
