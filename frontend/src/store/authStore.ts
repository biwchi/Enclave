import { User } from '@/services/user/types';
import { create } from 'zustand';

type AuthStoreState = {
  user: User;
  setUser: (user: User) => void;
};

export const useAuthStore = create<AuthStoreState>()((set) => ({
  user: {
    createdAt: new Date(),
    id: '',
    email: '',
    username: ''
  },
  setUser: (user) =>
    set(() => ({
      user
    }))
}));
