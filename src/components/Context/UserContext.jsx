import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
    const [isLogin, setIsLogin] = useState(false);
    const [token, setToken] = useState(null);

    // On component mount, check if a token exists and update the state
    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            setToken(savedToken);
            setIsLogin(true);
        }
    }, []);

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
            setIsLogin(true);
        } else {
            localStorage.removeItem("token");
            setIsLogin(false);
        }
    }, [token]);

    return (
        <UserContext.Provider value={{ isLogin, setIsLogin, token, setToken }}>
            {children}
        </UserContext.Provider>
    );
}
