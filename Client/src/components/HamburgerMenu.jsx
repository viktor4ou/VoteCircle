import { Menu, X } from "lucide-react";
import { useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import CreateEntity from "./CreateEntity";
import { Button } from "./ui/button";
import { ThemeSwitch } from "./ui/ThemeSwitch";
export const HamburgerMenu = () => {
    const [themeSwitchStatus, setThemeSwitchStatus] = useState(false);
    const [sheetOpen, setSheetOpen] = useState(false);
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="me-5 md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetTitle>
                    <p className="text-2xl font-bold justify-self-center mt-5">
                        Menu
                    </p>
                </SheetTitle>

                <div className="flex flex-col drop-shadow-xl mx-5 ">
                    <Button className="bg-[#4199FF] drop-shadow-xl mb-3 hover:bg-[#357dd0]">
                        Sign in
                    </Button>
                    <Button className="bg-[#4199FF] drop-shadow-xl  hover:bg-[#357dd0]">
                        Sign up
                    </Button>
                    <div className="mt-7 sm:hidden">
                        <CreateEntity />
                    </div>
                </div>
                <SheetDescription></SheetDescription>
                <SheetFooter>
                    <div className="flex justify-center mb-3"></div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};
