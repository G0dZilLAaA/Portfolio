import { createContext, useContext, useEffect, useMemo, useState } from "react";

import * as authService from "../services/auth.service.js";
import { clearToken, getStoredToken, saveToken } from "../services/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = getStoredToken();

        if (!token) {
            setLoading(false);
            return;
        }

        authService
            .getMe()
            .then((data) => setUser(data))
            .catch(() => {
                clearToken();
                setUser(null);
            })
            .finally(() => setLoading(false));
    }, []);

    const login = async ({ email, password, remember }) => {
        const { token, user: authUser } = await authService.login({ email, password });
        saveToken(token, remember);
        setUser(authUser);
        return authUser;
    };

    const logout = () => {
        clearToken();
        setUser(null);
    };

    const value = useMemo(
        () => ({
            user,
            loading,
            login,
            logout,
            isAuthenticated: Boolean(user)
        }),
        [user, loading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }

    return context;
}
