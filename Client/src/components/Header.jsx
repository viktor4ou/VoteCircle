import "../App.css";
import { useTheme } from "next-themes";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { ThemeSwitch } from "@/components/ui/ThemeSwitch";
import { HamburgerMenu } from "./HamburgerMenu";
import { AuthenticationButtons } from "./AuthenticationButtons";

const Header = () => {
    const { theme, setTheme } = useTheme();

    return (
        <header className="flex items-center justify-between bg-[#FAFAFA] dark:bg-black h-23 drop-shadow-xl border-b-2 ">
            <ThemeSwitch
                status={theme === "dark"}
                onCheckedChange={(checked) =>
                    setTheme(checked ? "dark" : "light")
                }
                className="drop-shadow-xl mx-5"
            />
            <div className="drop-shadow-xl sm:justify-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
                <Link to="/">
                    <span className="text-xl [@media(min-width:440px)]:text-4xl font-bold text-[#42db7b] drop-shadow-xl">
                        VoteCicle
                        <span className="text-xl [@media(min-width:440px)]:text-4xl font-bold text-[#263642] dark:text-white drop-shadow-xl">
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
                <AuthenticationButtons />
            </div>
        </header>
    );
};

export default Header;
