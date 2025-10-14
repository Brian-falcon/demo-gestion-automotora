import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RoleBasedRedirect = () => {
  const { user } = useAuth();
  
  // Redirigir según el rol del usuario
  if (user?.rol === 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  
  // Los clientes van directamente a sus pagos
  return <Navigate to="/pagos" replace />;
};

export default RoleBasedRedirect;
