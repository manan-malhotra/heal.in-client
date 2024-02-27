import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(() => {
        //onAuthChange
        setTimeout(() => {
            setIsAuthenticated(false);
        }, 3000);
    }, []);

    const login = async (username, password) => {
        try {
        } catch (error) {}
    };
    const register = async (username, password, email) => {
        try {
        } catch (error) {}
    };
    const logout = async () => {
        try {
        } catch (error) {}
    };
    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated, login, register, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const value = useContext(AuthContext);
    const { isAuthenticated } = value;
    console.log(isAuthenticated + " test");
    if (!value) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return value;
};
