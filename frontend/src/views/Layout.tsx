import Header from '@/components/Header';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <Header />
      <div className="m-auto mt-10 max-w-[1400px] px-4">
        <Outlet />
      </div>
    </>
  );
}
