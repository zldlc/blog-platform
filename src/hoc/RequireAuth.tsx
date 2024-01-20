import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../stores/hooks';

interface RequireAuthProps {
  children: ReactElement;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.user);

  if (!user) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
