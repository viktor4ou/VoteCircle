import { Routes, Route } from "react-router";
import MainPage from "./Pages/MainPage";
import ActivePoll from "./ActivePoll";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/session/:id" element={<ActivePoll />} />
        </Routes>
    );
};

export default AppRouter;
