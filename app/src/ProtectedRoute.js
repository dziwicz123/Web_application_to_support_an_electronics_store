import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, requiredUserType }) => {
    const { token } = useAuth();

    // 1. Jeśli nie mamy tokenu -> przekierowanie do logowania
    if (!token) {
        return <Navigate to="/login" />;
    }

    // 2. Dekodujemy token i sprawdzamy userType
    let userType;
    try {
        const decoded = jwtDecode(token);
        userType = decoded.userType; // zakładamy, że w tokenie jest pole "userType"
    } catch (error) {
        console.error('Error decoding token in ProtectedRoute:', error);
        return <Navigate to="/login" />;
    }

    // 3. Porównujemy z wymaganym typem użytkownika
    if (userType !== requiredUserType) {
        // Jeśli się nie zgadza – przekieruj np. na główną stronę lub /login
        return <Navigate to="/login" />;
    }

    // 4. Jeśli wszystko OK – renderuj to, co jest wewnątrz <ProtectedRoute> (czyli np. AdminPage)
    return children;
};

export default ProtectedRoute;
