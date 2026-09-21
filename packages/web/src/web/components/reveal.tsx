import { cn } from "@/lib/utils";
import { useScrollAnimation } from "../hooks/use-scroll-animation";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger in ms. */
  delay?: number;
  as?: "div" | "section" | "li" | "article";
}

/** Fades + lifts its children into view once, on scroll. */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const { ref, visible, reduced } = useScrollAnimation<HTMLDivElement>();
  const Tag = as;

  // Reduced motion: render plainly, no opacity tricks and no transform.
  if (reduced) {
    return (
      <Tag ref={ref} className={className}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref}
      className={cn("transition-none", className)}
      style={
        visible
          ? { animation: `fadeInUp 0.8s ease-out ${delay}ms forwards`, opacity: 0 }
          : { opacity: 0 }
      }
    >
      {children}
    </Tag>
  );
}
