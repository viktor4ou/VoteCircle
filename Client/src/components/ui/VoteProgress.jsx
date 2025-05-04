import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

function VoteProgress({ className, value, ...props }) {
    return (
        <div className="relative w-full">
            <ProgressPrimitive.Root
                data-slot="progress"
                className={cn(
                    // Increase the height to h-8 (or any value that fits your design)
                    "bg-[#eb324b] relative h-8 w-full overflow-hidden rounded-full",
                    className
                )}
                {...props}
            >
                <ProgressPrimitive.Indicator
                    data-slot="progress-indicator"
                    className="bg-[#42db7b] h-full flex-1 transition-all"
                    style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
                />
            </ProgressPrimitive.Root>
            {/* Overlay text container */}
            <div className="absolute inset-0 flex items-center justify-between px-3">
                <span className="text-white font-bold text-sm">
                    Yes ({value.toFixed(2)}%)
                </span>
                <span className="text-white font-bold text-sm">
                    No ({(100 - value).toFixed(2)}%)
                </span>
            </div>
        </div>
    );
}

export { VoteProgress };
