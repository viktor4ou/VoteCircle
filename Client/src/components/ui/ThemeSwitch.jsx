import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

function ThemeSwitch({ className, status, onCheckedChange, ...props }) {
    return (
        <SwitchPrimitive.Root
            checked={status}
            onCheckedChange={onCheckedChange}
            className={cn(
                "peer relative inline-flex h-8 w-[70px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
                "data-[state=checked]:bg-[#1e1e45] data-[state=unchecked]:bg-[#87CEEB]",
                className
            )}
            {...props}
        >
            {/* Background elements for dark mode */}
            <div
                className="absolute inset-0 data-[state=unchecked]:hidden overflow-hidden rounded-full"
                data-state={status ? "checked" : "unchecked"}
            >
                {/* Larger stars */}
                <div className="absolute top-1 left-2 h-1 w-1 rounded-full bg-white opacity-70" />
                <div className="absolute top-2 right-6 h-1 w-1 rounded-full bg-white opacity-70" />
                <div className="absolute bottom-2 left-4 h-1 w-1 rounded-full bg-white opacity-70" />
                <div className="absolute top-2 left-10 h-1 w-1 rounded-full bg-white opacity-70" />
                {/* Medium stars */}
                <div className="absolute top-3 right-3 h-[3px] w-[3px] rounded-full bg-white opacity-70" />
                <div className="absolute bottom-2 right-4 h-[3px] w-[3px] rounded-full bg-white opacity-70" />
                <div className="absolute top-4 left-6 h-[3px] w-[3px] rounded-full bg-white opacity-70" />
                <div className="absolute bottom-3 left-8 h-[3px] w-[3px] rounded-full bg-white opacity-70" />
                {/* Tiny stars */}
                <div className="absolute top-2 right-8 h-[2px] w-[2px] rounded-full bg-white opacity-60" />
                <div className="absolute bottom-1 right-2 h-[2px] w-[2px] rounded-full bg-white opacity-60" />
                <div className="absolute top-1 left-14 h-[2px] w-[2px] rounded-full bg-white opacity-60" />
                <div className="absolute bottom-2 left-12 h-[2px] w-[2px] rounded-full bg-white opacity-60" />
                <div className="absolute top-3 left-16 h-[2px] w-[2px] rounded-full bg-white opacity-60" />
                {/* Twinkling effect stars */}
                <div className="absolute top-1 right-12 h-[2px] w-[2px] rounded-full bg-white opacity-40 animate-pulse" />
                <div className="absolute bottom-3 right-14 h-[2px] w-[2px] rounded-full bg-white opacity-40 animate-pulse" />
                <div className="absolute top-4 right-16 h-[2px] w-[2px] rounded-full bg-white opacity-40 animate-pulse" />
            </div>
            {/* Background elements for light mode */}
            <div
                className="absolute inset-0 data-[state=checked]:hidden overflow-hidden rounded-full"
                data-state={status ? "checked" : "unchecked"}
            >
                <div className="absolute top-2 left-8 h-2 w-3 rounded-full bg-white opacity-50" />
                <div className="absolute bottom-1 left-12 h-2 w-4 rounded-full bg-white opacity-50" />
                <div className="absolute top-1 right-3 h-2 w-3 rounded-full bg-white opacity-50" />
            </div>
            <SwitchPrimitive.Thumb
                className={cn(
                    "relative flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-lg ring-0 transition-transform",
                    "data-[state=checked]:translate-x-9 data-[state=unchecked]:translate-x-0"
                )}
            >
                {status ? (
                    <Moon size={18} className="text-[#1e1e45]" />
                ) : (
                    <Sun size={18} className="text-[#FFD700]" />
                )}
            </SwitchPrimitive.Thumb>
        </SwitchPrimitive.Root>
    );
}

export { ThemeSwitch };
