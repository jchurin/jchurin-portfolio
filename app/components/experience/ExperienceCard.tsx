import { cn } from "~/utils/cn";

interface ExperienceCardProps {
    primaryTitle: string;
    secondaryTitle: string;
    subtitle: string;
    tech?: string[];
    highlights: string[];
    isHovered?: boolean;
    datePeriod?: string;
}

export const ExperienceCard = ({
    primaryTitle,
    secondaryTitle,
    subtitle,
    tech,
    highlights,
    isHovered,
    datePeriod,
}: ExperienceCardProps) => {
    return (
        <div
            className={cn(
                "border-border from-primary/10 to-muted/10 min-w-0 flex-1 cursor-pointer rounded-lg border bg-linear-to-br p-3 sm:p-4 transition-all duration-300",
                isHovered && "border-primary/30 shadow-lg shadow-primary/5"
            )}
        >
            {/* Always visible header */}
            <div className="flex flex-col gap-2 sm:gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <h3
                        className={cn(
                            "text-sm sm:text-base font-semibold transition-colors duration-300",
                            isHovered ? "text-primary" : "text-foreground"
                        )}
                    >
                        {primaryTitle}
                    </h3>
                    {secondaryTitle && (
                        <p className="text-muted-foreground text-xs sm:text-sm">{secondaryTitle}</p>
                    )}
                </div>
                <p className="text-muted-foreground text-xs sm:text-sm">{subtitle}</p>
            </div>

            {/* Accordion: Expandable details on hover/tap */}
            <div
                style={{
                    maxHeight: isHovered ? "500px" : "0",
                    opacity: isHovered ? 1 : 0,
                    marginTop: isHovered ? "0.75rem" : "0",
                    transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), margin-top 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                className="overflow-hidden"
            >
                <div className="space-y-2 sm:space-y-3">
                    {/* Tech Stack */}
                    {tech && tech.length > 0 && (
                        <div className="flex flex-wrap gap-1 sm:gap-1.5">
                            {tech.map((t, k) => (
                                <span
                                    key={k}
                                    className="bg-background/60 border-border/30 text-muted-foreground rounded-md border px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-medium"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Highlights */}
                    <ul className="text-muted-foreground space-y-1 sm:space-y-1.5 text-[10px] sm:text-xs leading-relaxed">
                        {highlights.map((highlight, j) => (
                            <li key={j} className="flex gap-1.5 sm:gap-2">
                                <span className="text-primary mt-0.5 shrink-0 text-xs sm:text-sm">•</span>
                                <span>{highlight}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
