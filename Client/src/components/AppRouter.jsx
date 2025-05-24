import { Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import ActivePoll from "./ActivePoll";
import Layout from "../auth/Layout";
import RequireAuth from "@/auth/RequireAuth";
const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<MainPage />} />
                <Route element={<RequireAuth />}>
                    <Route path="session/:id" element={<ActivePoll />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRouter;
