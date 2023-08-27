import CreateView from '@/views/CreateView';
import Layout from '@/views/Layout';
import ShopView from '@/views/ShopView';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const RoutesRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="shop" element={<ShopView />} />
        <Route path="create" element={<CreateView />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export const Router = RoutesRouter;
