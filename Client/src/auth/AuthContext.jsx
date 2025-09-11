import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    useCallback,
} from "react";
import api from "@/utility/axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
const AuthContext = createContext();
export default AuthContext;

export function AuthProvider({ children }) {
    const [accessToken, setAccessToken] = useState(() =>
        localStorage.getItem("token")
    );
    const [user, setUser] = useState(() =>
        {
            if (accessToken) {
                let decode = jwtDecode(accessToken);
                let roles = decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                return {id:decode.sub, roles:roles}            
            }
            else{
               return null;
            }
        }
        
    );
    
    const login = useCallback(async (email, password) => {
        try {
            const res = await api.post("/Authentication/SignIn", {
                email,
                password,
            });
            if (res.status === 200) {
                const token = res.data.token;
                localStorage.setItem("token", token);
                setAccessToken(token);
                let decode = jwtDecode(token)
                let roles = decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                setUser({id:decode.sub, roles: roles});
                toast.success("Successfully logged in!");
            }
            return res.data;
        } catch (error) {
            toast.error(error.response.data);
        }
    }, []);

    const register = useCallback(
        async (email, password) => {
            // Register new user then log them in
            try {
                const response = await api.post("/Authentication/SignUp", {
                    email,
                    password,
                });

                return login(email, password);
            } catch (error) {
                if (error.response.data.errors.PasswordRequiresDigit) {
                    toast.error(
                        error.response.data.errors.PasswordRequiresDigit
                    );
                }
                if (
                    error.response.data.errors.PasswordRequiresNonAlphanumeric
                ) {
                    toast.error(
                        error.response.data.errors
                            .PasswordRequiresNonAlphanumeric
                    );
                }
                if (error.response.data.errors.PasswordRequiresUpper) {
                    toast.error(
                        error.response.data.errors.PasswordRequiresUpper
                    );
                }
                if (error.response.data.errors.PasswordTooShort) {
                    toast.error(error.response.data.errors.PasswordTooShort);
                }
                return { isSuccessful: false };
            }
        },
        [login]
    );

    const logout = useCallback(async () => {
        try {
            const response = await api.post("/Authentication/Revoke");
            if (response.status === 200) {
                toast.success("Successfully logged out!");
            }
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
