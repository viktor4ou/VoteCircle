import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    useCallback,
} from "react";
import api from "@/utility/axios";
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext();
export default AuthContext;

export function AuthProvider({ children }) {
    const [accessToken, setAccessToken] = useState(() =>
        localStorage.getItem("token")
    );
    const [user, setUser] = useState(() =>
        accessToken ? jwtDecode(accessToken).sub : null
    );

    const login = useCallback(async (email, password) => {
        const res = await api.post("/Authentication/SignIn", {
            email,
            password,
        });
        const token = res.data.token;
        localStorage.setItem("token", token);
        setAccessToken(token);
        setUser(jwtDecode(token).sub);
        return res.data;
    }, []);

    const register = useCallback(
        async (email, password) => {
            // Register new user then log them in
            await api.post("/Identity/register", { email, password });
            return login(email, password);
        },
        [login]
    );

    const logout = useCallback(async () => {
        try {
            await api.post("/Authentication/Revoke");
        } finally {
            localStorage.removeItem("token");
            setAccessToken(null);
            setUser(null);
        }
    }, []);

    const refresh = useCallback(async () => {
        const res = await api.post("/Authentication/Refresh");
        const token = res.data.token;
        localStorage.setItem("token", token);
        setAccessToken(token);
        setUser(jwtDecode(token).sub);
        return token;
    }, []);

    // keep tokens in sync if they change elsewhere
    useEffect(() => {
        const handleStorage = () => {
            const t = localStorage.getItem("token");
            setAccessToken(t);
            setUser(t ? jwtDecode(t).sub : null);
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    return (
        <AuthContext.Provider
            value={{ user, accessToken, login, register, logout, refresh }}
        >
            {children}
        </AuthContext.Provider>
    );
}
