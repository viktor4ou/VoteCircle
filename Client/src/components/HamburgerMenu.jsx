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
import { Button } from "./ui/button";
import { AuthenticationButtons } from "./AuthenticationButtons";
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

                <div className="flex drop-shadow-xl justify-center ml-6">
                    <AuthenticationButtons />
                </div>
                <SheetDescription></SheetDescription>
                <SheetFooter>
                    <div className="flex justify-center mb-3"></div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};
