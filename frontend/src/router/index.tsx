import Layout from '@/views/Layout';
import ShopPage from '@/views/ShopPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const RoutesRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="shop" element={<ShopPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export const Router = RoutesRouter;
