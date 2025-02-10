import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';

export default function ProtectedRoute({ children }) {
    const { isLogin } = useContext(UserContext);
    const location = useLocation();

    if (!isLogin) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    return children;
}
