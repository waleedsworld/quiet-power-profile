import {
  type ReactNode,
  type ElementType,
  type CSSProperties,
  type HTMLAttributes,
} from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";

type RevealProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  className?: string;
  /** stagger delay in ms */
  delay?: number;
  /** direction the element travels in from */
  from?: "up" | "down" | "left" | "right" | "none";
  as?: ElementType;
  style?: CSSProperties;
};

const offset: Record<NonNullable<RevealProps["from"]>, string> = {
  up: "translate3d(0, 28px, 0)",
  down: "translate3d(0, -28px, 0)",
  left: "translate3d(28px, 0, 0)",
  right: "translate3d(-28px, 0, 0)",
  none: "translate3d(0, 0, 0)",
};

/**
 * Reveal — wraps content in a scroll-triggered entrance transition.
 * Purely presentational: it never changes the layout or content, so it is
 * safe to drop around any block. Falls back to visible instantly for users
 * who prefer reduced motion (handled inside useScrollReveal).
 */
export const Reveal = ({
  children,
  className,
  delay = 0,
  from = "up",
  as,
  style,
  ...rest
}: RevealProps) => {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  const Tag = (as ?? "div") as ElementType;

  return (
    <Tag
      ref={ref}
      className={cn("will-change-transform", className)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate3d(0,0,0)" : offset[from],
        transition:
          "opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${delay}ms`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};
