import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./AuthContext";
import { toast } from "sonner";
import useAuth from "@/CustomHooks/useAuth";
const RequireAuth = () => {
    const { user } = useAuth();
    const location = useLocation();

    return user ? (
        <Outlet />
    ) : (
        <>
            {toast.error("Unauthorized. Please sign in!")}
            <Navigate to="/" state={{ from: location }} replace />
        </>
    );
};

export default RequireAuth;
