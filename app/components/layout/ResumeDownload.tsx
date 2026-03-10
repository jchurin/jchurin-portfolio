import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { cn } from "../../utils/cn";

/**
 * Finds the highest numbered resume file in the public/resume folder
 * @param maxAttempts - Maximum number to check (default: 20)
 * @returns The highest version number found, or 1 if none found
 */
async function findLatestResumeVersion(maxAttempts = 20): Promise<number> {
  let latestVersion = 1;

  for (let i = 1; i <= maxAttempts; i++) {
    try {
      const response = await fetch(
        `${import.meta.env.BASE_URL}resume/${i}.pdf`,
        { method: "HEAD" }
      );

      if (response.ok) {
        latestVersion = i;
      } else {
        break;
      }
    } catch {
      break;
    }
  }

  return latestVersion;
}

export function ResumeDownload() {
  const [version, setVersion] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    findLatestResumeVersion().then((latest) => {
      setVersion(latest);
      setIsLoading(false);
    });
  }, []);

  const resumeUrl = `${import.meta.env.BASE_URL}resume/${version}.pdf`;

  return (
    <a
      href={resumeUrl}
      download="JuanChurin-Resume.pdf"
      className={cn(
        "relative flex items-center justify-center",
        "size-9 rounded-lg",
        "border border-border/40 bg-background/80 backdrop-blur-sm",
        "text-muted-foreground hover:text-foreground hover:border-border",
        "transition-all duration-300",
        "hover:scale-105 active:scale-95",
        isLoading && "opacity-50 cursor-wait"
      )}
      aria-label="Download Resume"
      title="Download Resume (PDF)"
    >
      <Download className="size-4" />
    </a>
  );
}
