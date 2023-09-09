import Header from '@/components/Header';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="flex h-full flex-col">
      <Header />
      <div className="m-auto w-full flex-auto my-10 max-w-[1400px] px-4">
        <Outlet />
      </div>
    </div>
  );
}
