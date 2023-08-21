import Header from '@/components/Header';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <Header />
      <div className="max-w-[1400px] mt-10 px-4 m-auto">
        <Outlet />
      </div>
    </>
  );
}
