import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';

export default function ProtectedAuth({ children }) {
    const { isLogin } = useContext(UserContext);
    const location = useLocation();

    if (isLogin) {
        // Redirect logged-in users trying to access login/register back to the previous page
        return <Navigate to={location.state?.from || "/"} replace />;
    }

    return children;
}
