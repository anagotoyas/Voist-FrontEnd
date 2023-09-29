import { Navigate, Outlet } from 'react-router-dom'


import PropTypes from 'prop-types';

export const ProtectedRoute = ({ redirectTo, isAllowed, children }) => {
    
    if (!isAllowed) {
        return <Navigate to={redirectTo} replace />;
    }

    return children ? children : <Outlet />;
};

ProtectedRoute.propTypes = {
    redirectTo: PropTypes.string,
    isAllowed: PropTypes.bool,
    children: PropTypes.node,
};
