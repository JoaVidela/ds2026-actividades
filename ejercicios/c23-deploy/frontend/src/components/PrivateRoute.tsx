import { Navigate, Outlet } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import type { Rol } from '../types/usuario';

type PrivateRouteProps = {
  rol?: Rol;
};

function PrivateRoute({ rol }: PrivateRouteProps) {
  const { usuario, cargando } = useAuth();

  if (cargando) {
    return (
      <div className="container my-5 text-center">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  if (!usuario) return <Navigate to="/login" replace />;

  if (rol && usuario.rol !== rol) return <Navigate to="/sin-permiso" replace />;

  return <Outlet />;
}

export default PrivateRoute;
