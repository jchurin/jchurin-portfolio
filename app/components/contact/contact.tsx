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
      className="relative min-h-screen flex flex-col justify-center py-section snap-start overflow-hidden"
    >
      {/* Decorative background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
          style={{
            background: "radial-gradient(circle, var(--theme-primary) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative max-w-3xl mx-auto px-4">
        <h2 className="font-heading text-3xl sm:text-4xl font-normal mb-4 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
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
                  className="group flex items-center gap-4 p-5 rounded-xl border border-border/60 bg-gradient-to-r from-muted/30 to-muted/10 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200 hover:-translate-y-0.5 backdrop-blur-sm"
                >
                  {Icon && (
                    <div className="flex items-center justify-center size-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 text-primary group-hover:scale-110 transition-transform duration-200 shadow-sm">
                      <Icon className="size-5 shrink-0" />
                    </div>
                  )}
                  <span className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
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
