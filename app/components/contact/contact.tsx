import { Phone, Mail, Linkedin } from "lucide-react";
import contactData from "./contact.data.json";

const iconMap = {
  phone: Phone,
  email: Mail,
  linkedin: Linkedin,
} as const;

export function Contact() {
  const { title, items } = contactData;

  return (
    <section
      id="contact"
      className="py-section relative flex min-h-screen snap-start flex-col justify-center overflow-hidden"
    >
      {/* Decorative background gradient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-3xl"
          style={{
            background: "radial-gradient(circle, var(--theme-primary) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-3xl px-4">
        <h2 className="font-heading from-foreground to-foreground/70 mb-4 bg-gradient-to-br bg-clip-text text-3xl font-normal text-transparent sm:text-4xl">
          {title}
        </h2>
        <p className="text-muted-foreground mb-12 text-lg">
          Let's connect and create something amazing together.
        </p>

        <ul className="space-y-3">
          {items.map((item, i) => {
            const Icon = iconMap[item.type as keyof typeof iconMap];
            return (
              <li key={i}>
                <a
                  href={item.href}
                  target={item.type === "linkedin" ? "_blank" : undefined}
                  rel={item.type === "linkedin" ? "noreferrer" : undefined}
                  className="group border-border/60 from-muted/30 to-muted/10 hover:border-primary/40 hover:shadow-primary/5 flex items-center gap-4 rounded-xl border bg-gradient-to-r p-5 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  {Icon && (
                    <div className="from-primary/20 to-secondary/20 text-primary flex size-12 items-center justify-center rounded-lg bg-gradient-to-br shadow-sm transition-transform duration-200 group-hover:scale-110">
                      <Icon className="size-5 shrink-0" />
                    </div>
                  )}
                  <span className="text-foreground group-hover:text-primary text-lg font-medium transition-colors">
                    {item.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
