"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { fadeUp, transition } from "@/lib/motion";

export default function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.5,
  direction = "up",
  blur = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  blur?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduceMotion = useReducedMotion();

  const getVariants = () => {
    const distance = 24;
    const axis = direction === "left" || direction === "right" ? "x" : "y";
    const sign = direction === "down" || direction === "right" ? -1 : 1;

    return {
      hidden: { 
        opacity: 0, 
        [axis]: distance * sign,
        filter: blur ? "blur(4px)" : "none" 
      },
      show: { 
        opacity: 1, 
        [axis]: 0,
        filter: "blur(0px)" 
      },
    };
  };

  return (
    <motion.div
      ref={ref}
      variants={getVariants()}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      transition={
        reduceMotion 
          ? { duration: 0 } 
          : { ...transition, delay, duration }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
