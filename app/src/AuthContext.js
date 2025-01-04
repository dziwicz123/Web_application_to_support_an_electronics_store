import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Zamiast user – przechowujemy token
    const [token, setToken] = useState(null);

    useEffect(() => {
        // Sprawdzamy, czy w sessionStorage jest zapamiętany token
        const storedToken = sessionStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    // Funkcja login – przyjmuje token
    const login = (newToken) => {
        setToken(newToken);
        sessionStorage.setItem('token', newToken);
    };

    // Funkcja logout – usuwa token
    const logout = () => {
        setToken(null);
        sessionStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
