import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, requiredUserType }) => {
    const { user } = useAuth();

    if (!user || user.userType !== requiredUserType) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
