import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './authContext';

const PrivateRoute = () => {

  const { isAuthenticated, isActive, isAdmin, userData } = useAuth();

  console.table(isAdmin, isActive, isAdmin, userData)

  // Si no está autenticado o no está activo -> login
  if (!isAuthenticated || !isActive || !isAdmin) {
    return <Navigate to="/login" />;
  }

  // Si pasa todas las validaciones -> mostrar la ruta admin
  return <Outlet />;

};

export default PrivateRoute;