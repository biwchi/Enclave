import { AxiosResponse, type AxiosInstance, AxiosRequestConfig } from 'axios';

export class BaseRest {
  constructor(protected readonly endpoint: AxiosInstance) {}

  private static async extractData<T>(request: Promise<AxiosResponse<T>>) {
    const { data } = await request;
    return data;
  }

  protected get<T>(url: string, config?: AxiosRequestConfig) {
    return BaseRest.extractData<T>(this.endpoint.get(url, config));
  }

  protected delete<T>(url: string, config?: AxiosRequestConfig) {
    return BaseRest.extractData<T>(this.endpoint.delete(url, config));
  }

  protected post<T>(url: string, data?: object, config?: AxiosRequestConfig) {
    return BaseRest.extractData<T>(this.endpoint.post(url, data, config));
  }

  protected patch<T>(url: string, data: object, config?: AxiosRequestConfig) {
    return BaseRest.extractData<T>(this.endpoint.patch(url, data, config));
  }
}
