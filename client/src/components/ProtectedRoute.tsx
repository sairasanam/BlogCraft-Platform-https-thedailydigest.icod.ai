import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, token } = useAppSelector((s) => s.auth);

  if (!token || !user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
