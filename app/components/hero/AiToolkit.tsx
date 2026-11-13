import { Sparkles } from "lucide-react";

interface AiToolkitProps {
  label: string;
  tools: string[];
}

/**
 * Row of AI tools shown in the hero, so the AI-native workflow is visible at first glance
 */
export function AiToolkit({ label, tools }: AiToolkitProps) {
  return (
    <div className="short:mt-6 mt-8 flex flex-col items-center gap-3 sm:mt-10">
      <span className="text-muted-foreground inline-flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase">
        <Sparkles className="text-primary size-3.5" aria-hidden="true" />
        {label}
      </span>
      <ul className="flex flex-wrap justify-center gap-2">
        {tools.map((tool) => (
          <li
            key={tool}
            className="border-primary/25 from-primary/10 to-secondary/10 text-foreground rounded-full border bg-linear-to-r px-3 py-1 text-xs font-medium backdrop-blur-sm sm:px-4 sm:py-1.5 sm:text-sm"
          >
            {tool}
          </li>
        ))}
      </ul>
    </div>
  );
}
