import { ExperienceCard } from "./ExperienceCard";
import { cn } from "../../utils/cn";

interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
    datePeriod: string;
    primaryTitle: string;
    secondaryTitle: string;
    subtitle: string;
    tech?: string[];
    highlights: string[];
    isHovered: boolean;
    index: number;
    totalItems: number;
}

// Map percentage to nearest Tailwind opacity value
const getTailwindOpacity = (percent: number): number => {
    const opacities = [0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 100];
    return opacities.reduce((prev, curr) =>
        Math.abs(curr - percent) < Math.abs(prev - percent) ? curr : prev
    );
};

export const TimelineItem = ({
    datePeriod,
    primaryTitle,
    secondaryTitle,
    subtitle,
    tech,
    highlights,
    isHovered,
    index,
    totalItems,
    ...props
}: TimelineItemProps) => {

    const progress = (100 / totalItems) * (index + 1);
    const previousProgress = (100 / totalItems) * index;

    // Invert for gradient: 100 at top (past items) to 0 at bottom (future items)
    const fromOpacity = getTailwindOpacity(100 - previousProgress);
    const toOpacity = getTailwindOpacity(100 - progress);

    return (
        <div
            className="relative flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-12"
            {...props}
        >
            {/* Date - Top on mobile, Left on desktop */}
            <div className="sm:min-w-36 sm:text-right">
                <span className="text-muted-foreground text-xs sm:text-xs font-medium block sm:inline">{datePeriod}</span>
            </div>

            {/* Timeline progress line - Hidden on mobile, shown on desktop */}
            <div
                className={cn(
                    "hidden sm:block absolute top-0 bottom-0 left-42 w-px",
                    "bg-linear-to-b",
                    `from-primary/${fromOpacity}`,
                    `to-primary/${toOpacity}`
                )}
            />

            {/* Company & Role - Expandable Card */}
            <ExperienceCard
                primaryTitle={primaryTitle}
                secondaryTitle={secondaryTitle}
                subtitle={subtitle}
                tech={tech}
                highlights={highlights}
                isHovered={isHovered}
                datePeriod={datePeriod}
            />
        </div>
    );
};
