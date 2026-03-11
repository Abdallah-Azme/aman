"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-3 w-full rounded-full",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary rounded-full relative h-full w-full flex-1 transition-all duration-500 ease-in-out"
        style={{ width: `${value || 0}%` }}
      >
        <div className="absolute end-0 top-1/2 size-6 -translate-y-1/2  rounded-full border-4 border-primary bg-gray-200 shadow-sm" />
      </ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
  );
}

export { Progress };
