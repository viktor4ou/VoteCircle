import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRouter from "./components/AppRouter";
import { Toaster } from "./components/ui/sonner";
function App() {
    return (
        <>
            <Header />
            <AppRouter />
            <Footer />
            <Toaster richColors={true} theme={"dark"} />
        </>
    );
}

export default App;
