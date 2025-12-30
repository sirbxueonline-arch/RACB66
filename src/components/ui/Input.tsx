import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export default function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "focus-ring w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black shadow-sm placeholder:text-black/40",
        className
      )}
    />
  );
}
