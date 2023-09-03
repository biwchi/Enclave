import { useAuthStore } from '@/store/authStore';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const isLoggedIn = useAuthStore().isLoggedIn;

  return isLoggedIn ? children : <Navigate to={'/'} replace />;
}
