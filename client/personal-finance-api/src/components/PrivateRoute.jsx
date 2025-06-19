import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * Protege rutas privadas . Si el usuario no está autenticado , lo redirige a login. 
 */


const PrivateRoute = () => {
    const { isAuthenticated } = useSelector(state => state.auth);

    return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute;