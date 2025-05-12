"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const UvProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    "aria-label"?: string;
  }
>(({ className, value, "aria-label": ariaLabel, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "bg-secondary relative h-3 w-full overflow-hidden rounded-full",
      className,
    )}
    aria-label={ariaLabel}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="bg-primary h-3 w-3 flex-1 rounded-full shadow-lg ring-2 shadow-white dark:ring-gray-500"
      style={{ marginLeft: `${value}%` }}
    />
  </ProgressPrimitive.Root>
));
UvProgress.displayName = ProgressPrimitive.Root.displayName;

export { UvProgress };
