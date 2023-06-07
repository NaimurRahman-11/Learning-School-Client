import { useContext } from 'react';

import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';

const PrivateRoute = ({children}) => {

    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div className="spinner-border container" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>;
    }

    if (user) {
        return children;
    }


    return <Navigate state={{from: location}} to='/login' replace></Navigate>;
};

export default PrivateRoute;