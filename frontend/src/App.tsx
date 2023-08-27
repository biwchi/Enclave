import { useEffect } from 'react';
import { Router } from './router';
import { useShopStore } from './store/shopStore';
import { useRest } from './services';

function App() {
  const api = useRest();
  const { setCategories } = useShopStore();

  async function getCategories() {
    const response = await api.products.getCategories();
    setCategories(response.results);
  }

  useEffect(() => {
    getCategories();
  }, []);
  return <Router />;
}

export default App;
