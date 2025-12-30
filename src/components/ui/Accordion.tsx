"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type AccordionItemData = {
  id: string;
  title: string;
  content: string;
};

export default function Accordion({
  items,
}: {
  items: AccordionItemData[];
}) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <AccordionItem key={item.id} item={item} />
      ))}
    </div>
  );
}

function AccordionItem({ item }: { item: AccordionItemData }) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <details
      className="group rounded-2xl border border-black/10 bg-white px-5 py-4 shadow-sm"
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-black">
        {item.title}
        <span
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-full border border-black/10 text-black/70 transition group-open:rotate-45"
          )}
          aria-hidden="true"
        >
          +
        </span>
      </summary>
      <AnimatePresence initial={false}>
        <motion.div
          initial={false}
          animate={open ? "open" : "collapsed"}
          variants={{
            open: { height: "auto", opacity: 1 },
            collapsed: { height: 0, opacity: 0 },
          }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.3, ease: "easeOut" }
          }
          className="overflow-hidden"
        >
          <div className="pt-3 text-sm text-black/70">{item.content}</div>
        </motion.div>
      </AnimatePresence>
    </details>
  );
}
