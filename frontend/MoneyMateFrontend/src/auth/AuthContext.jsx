import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    
    const [isLogged, setIsLogged] = useState(() => {
        const storedValue = localStorage.getItem('isLogged');
        return storedValue === 'true'; 
    });

    useEffect(() => {
        localStorage.setItem('isLogged', isLogged);
    }, [isLogged]);

    return (
        <AuthContext.Provider value={{ isLogged, setIsLogged }}>
            {children}
        </AuthContext.Provider>
    );
};