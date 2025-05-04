import "../App.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { ThemeSwitch } from "@/components/ui/ThemeSwitch";
import { HamburgerMenu } from "./HamburgerMenu";
import { logout } from "@/utility/Authentication";
import { AuthenticationButtons } from "./AuthenticationButtons";
const Header = () => {
    const [themeSwitchStatus, setThemeSwitchStatus] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    async function logoutOnClick() {
        const response = await logout();
        setIsAuthenticated(false);
        console.log(isAuthenticated);
        navigate("/");
    }

    return (
        <header className="flex items-center justify-between bg-[#FAFAFA] dark:bg-black h-23 drop-shadow-xl border-b-2 ">
            <ThemeSwitch
                status={themeSwitchStatus}
                onCheckedChange={(checked) => setThemeSwitchStatus(checked)}
                className="drop-shadow-xl mx-5"
            />
            <div className="drop-shadow-xl sm:justify-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
                <Link to="/">
                    <span className="text-4xl font-bold  text-[#42db7b] drop-shadow-xl">
                        Voting
                        <span className="text-4xl font-bold text-[#263642] drop-shadow-xl">
                            {" "}
                            App
                        </span>
                    </span>
                </Link>
            </div>
            <div>
                <HamburgerMenu />
            </div>

            <div className="drop-shadow-xl absolute right-1 transform -translate-x-1 max-md:hidden">
                {isAuthenticated ? (
                    <Button
                        className="bg-[#4199FF] drop-shadow-xl me-5 hover:bg-[#357dd0]"
                        onClick={() => logoutOnClick()}
                    >
                        Log out
                    </Button>
                ) : (
                    <AuthenticationButtons
                        setIsAuthenticated={setIsAuthenticated}
                        isAuthenticated={isAuthenticated}
                    />
                )}
            </div>
        </header>
    );
};

export default Header;
