import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export default function Badge({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...props}
      className={cn(
        "inline-flex items-center rounded-full bg-black px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white",
        className
      )}
    />
  );
}
