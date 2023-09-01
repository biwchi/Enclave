import { AxiosInstance } from 'axios';
import { BaseRest } from '../base';
import { Login, Register, User } from './types';

export class UserRest extends BaseRest {
  constructor(endpoint: AxiosInstance) {
    super(endpoint);
  }

  public getCurrentUser() {
    return this.get<User>('user/profile');
  }

  public login(data: Login) {
    return this.post<{ access_token: string }>('user/login', data);
  }

  public register(data: Register) {
    return this.post<User>('user/register', data);
  }
}
