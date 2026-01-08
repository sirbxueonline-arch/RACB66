import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

const baseStyles =
  "focus-ring inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition hover:-translate-y-0.5 active:translate-y-0";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-yellow text-black shadow-soft hover:bg-[#f7b44a] border border-transparent",
  secondary:
    "bg-black text-white hover:bg-black/90 border border-black",
  ghost: "bg-transparent text-black hover:bg-black/5",
  outline:
    "border border-black/15 text-black hover:border-black/40 hover:bg-black/5",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...(props as any)}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
    />
  );
}
