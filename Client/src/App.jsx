import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRouter from "./components/AppRouter";
import { Toaster } from "./components/ui/sonner";

function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 mb-20">
                <AppRouter />
            </main>
            <Footer />
            <Toaster richColors={true} theme={"dark"} />
        </div>
    );
}

export default App;
