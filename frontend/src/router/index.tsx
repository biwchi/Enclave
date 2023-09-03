import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';

import CreateView from '@/views/CreateView';
import Layout from '@/views/Layout';
import ShopView from '@/views/ShopView';
import WishlistView from '@/views/WishlistView';

function RoutesRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="shop" element={<ShopView />} />
          <Route path="create" element={<ProtectedRoute children={<CreateView />} />} />
          <Route path="wishlist" element={<ProtectedRoute children={<WishlistView />} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export const Router = RoutesRouter;
