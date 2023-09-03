import { User } from '@/services/user/types';
import { create } from 'zustand';

type AuthStoreState = {
  user: User;
  isLoggedIn: boolean;
  setUser: (user: User) => void;
  setIsLoggedIn: (value: boolean) => void;
};

export const useAuthStore = create<AuthStoreState>()((set) => ({
  user: {
    createdAt: new Date(),
    id: '',
    email: '',
    username: ''
  },
  isLoggedIn: false,
  setIsLoggedIn: (value) => set(() => ({ isLoggedIn: value })),
  setUser: (user) =>
    set(() => ({
      user
    }))
}));
