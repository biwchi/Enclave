import { useEffect, useState } from 'react';
import { Router } from './router';
import { useRest } from './services';
import { useAuthStore } from './store/authStore';

import Loader from './components/Common/Loader';
import { Category } from './services/products/types';
import { CategoriesContext } from './contexts/categoriesContext';

function App() {
  const api = useRest();
  const { isLoggedIn, setIsLoggedIn, setUser } = useAuthStore();

  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getCategories() {
    const response = await api.products.getCategories();
    setCategories(response.results);
  }

  async function init() {
    try {
      const currentUser = await api.user.getCurrentUser();

      setIsLoggedIn(true);
      setUser(currentUser);
    } catch (error) {
      setIsLoggedIn(false);
      setUser({ id: '', username: '', email: '', createdAt: new Date() });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!isLoggedIn) {
      init();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    getCategories();
  }, []);

  return isLoading ? (
    <div className="flex h-screen w-screen items-center justify-center">
      <Loader />
    </div>
  ) : (
    <CategoriesContext.Provider value={categories}>
      <Router />
    </CategoriesContext.Provider>
  );
}

export default App;
