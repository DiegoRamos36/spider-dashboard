import { useLogged } from './src/hooks/useLogged';
import { Navigate } from 'react-router-dom';

const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useLogged();

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectRoute;
