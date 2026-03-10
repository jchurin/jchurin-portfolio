import { cn } from "~/utils/cn";

interface ExperienceCardProps {
  primaryTitle: string;
  secondaryTitle: string;
  subtitle: string;
  isHovered?: boolean;
}

export const ExperienceCard = ({
  primaryTitle,
  secondaryTitle,
  subtitle,
  isHovered,
}: ExperienceCardProps) => {
  return (
    <div className="border-border from-primary/10 to-muted/10 hover:bg-primary/10 min-w-0 flex-1 cursor-pointer rounded-lg border bg-linear-to-br p-4 transition-all duration-300">
      <div className="flex flex-col gap-3">
        <span className="flex flex-row items-center gap-2">
          <h3
            className={cn(
              "text-base font-semibold transition-colors duration-300",
              isHovered ? "text-primary" : "text-foreground"
            )}
          >
            {primaryTitle}
          </h3>
          <p className="text-muted-foreground text-sm">{secondaryTitle}</p>
        </span>
        {/* <span className="text-muted-foreground">•</span> */}
        <p className="text-muted-foreground text-sm">{subtitle}</p>
      </div>
    </div>
  );
};
