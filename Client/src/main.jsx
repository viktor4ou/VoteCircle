import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./auth/AuthContext";
import { ThemeProvider } from "./components/ThemeProvider";

createRoot(document.getElementById("root")).render(
    // <StrictMode>
    <AuthProvider>
        <ThemeProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ThemeProvider>
    </AuthProvider>
    // </StrictMode>
);
