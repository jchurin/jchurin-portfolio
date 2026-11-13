import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface SkillGroupProps {
  title: string;
  children: ReactNode;
  className?: string;
  listClassName?: string;
}

/**
 * Titled group of skill chips (e.g. AI-Assisted Development, Languages)
 */
export function SkillGroup({ title, children, className, listClassName }: SkillGroupProps) {
  return (
    <div className={className}>
      <h3 className="text-foreground short:mb-2 mb-4 flex items-center justify-center gap-2 text-lg font-semibold sm:mb-5 sm:justify-start sm:text-xl">
        <span className="from-primary to-secondary h-5 w-1 rounded-full bg-gradient-to-b sm:h-6" />
        {title}
      </h3>
      <ul
        className={cn(
          "flex flex-wrap justify-center gap-2 sm:justify-start sm:gap-3",
          listClassName
        )}
      >
        {children}
      </ul>
    </div>
  );
}
