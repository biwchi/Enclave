import { useRest } from '@/services';
import { useAuthStore } from '@/store/authStore';
import { useEffect, useState } from 'react';

function authListener() {
  const api = useRest();
  const { setUser } = useAuthStore();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function init() {
    try {
      const currentUser = await api.user.getCurrentUser();
      setIsLoggedIn(true);
      setUser(currentUser);
    } catch (error) {
      setIsLoggedIn(false);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return { isLoggedIn, setIsLoggedIn, init };
}

export const useAuthListener = authListener;
