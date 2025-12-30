import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const mdxComponents = {
  h2: (props: ComponentProps<"h2">) => (
    <h2
      {...props}
      className={cn("mt-10 text-2xl font-semibold text-black", props.className)}
    />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3
      {...props}
      className={cn("mt-8 text-xl font-semibold text-black", props.className)}
    />
  ),
  p: (props: ComponentProps<"p">) => (
    <p {...props} className={cn("mt-4 text-base text-black/80", props.className)} />
  ),
  ul: (props: ComponentProps<"ul">) => (
    <ul {...props} className={cn("mt-4 list-disc space-y-2 pl-6", props.className)} />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol {...props} className={cn("mt-4 list-decimal space-y-2 pl-6", props.className)} />
  ),
  a: (props: ComponentProps<"a">) => (
    <a
      {...props}
      className={cn(
        "font-medium text-black underline decoration-brand-yellow/70 underline-offset-4",
        props.className
      )}
    />
  ),
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote
      {...props}
      className={cn(
        "mt-6 border-l-2 border-brand-yellow pl-4 text-black/70",
        props.className
      )}
    />
  ),
};
