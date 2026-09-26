import { cn } from "@/lib/utils";

interface FramedTitleProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  align?: "center" | "start";
  className?: string;
}

/**
 * The hand-drawn frame from the studio's printed brochure ("PACOTES"),
 * around a letter-spaced title. The frame is a mask, so it takes the theme's
 * ink in light and dark mode alike.
 */
export function FramedTitle({ children, as: Tag = "h2", align = "center", className }: FramedTitleProps) {
  return (
    <Tag
      className={cn(
        "ornament-frame text-primary relative grid aspect-[1170/304] w-[min(100%,21rem)] place-items-center px-10 text-center text-[13px] leading-snug font-normal tracking-[0.3em] uppercase md:w-[23rem] md:text-[15px]",
        align === "center" ? "mx-auto" : "mx-auto md:mx-0",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
