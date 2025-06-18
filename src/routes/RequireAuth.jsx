import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    // Comparamos el rol del usuario en el contexto con los roles permitidos para esta ruta
    // NOTA: Esta es una implementación simple. En un futuro, si el auth.rol no está
    // al cargar la página, se debería esperar a que se cargue o redirigir.
    if (auth?.rol && allowedRoles?.includes(auth.rol)) {
        return <Outlet />; // Si el rol es permitido, renderiza el componente hijo de la ruta
    }

    if (auth?.token) { // Si está logueado pero no tiene el rol correcto
        return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }

    // Si no está logueado
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;