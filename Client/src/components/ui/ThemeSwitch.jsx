import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { Sun, Moon } from "lucide-react";

import { cn } from "@/lib/utils";

function ThemeSwitch({ className, status, onCheckedChange, ...props }) {
    return (
        <SwitchPrimitive.Root
            // Wire up our checked status and the onCheckedChange handler
            checked={status}
            onCheckedChange={onCheckedChange}
            className={cn(
                "peer inline-flex h-7 w-15 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-xs outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50",
                // Switch background color when checked/unchecked:
                "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
                className
            )}
            {...props}
        >
            <SwitchPrimitive.Thumb
                className={cn(
                    "relative flex h-8 w-8 items-center justify-center rounded-full bg-background shadow-lg ring-0 transition-transform",
                    // Translate the thumb when checked vs. unchecked:
                    "data-[state=checked]:translate-x-[28px] data-[state=unchecked]:translate-x-0"
                )}
            >
                {status ? (
                    <Moon size={25} className="absolute text-gray-800" />
                ) : (
                    <Sun size={25} className="absolute text-yellow-500" />
                )}
            </SwitchPrimitive.Thumb>
        </SwitchPrimitive.Root>
    );
}

export { ThemeSwitch };
