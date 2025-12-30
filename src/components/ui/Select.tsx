import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export default function Select({
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "focus-ring w-full appearance-none rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black shadow-sm",
        className
      )}
    />
  );
}
