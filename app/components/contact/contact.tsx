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
      className="min-h-screen flex flex-col justify-center py-section snap-start"
    >
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="font-serif text-3xl sm:text-4xl font-normal text-foreground mb-12">
          {title}
        </h2>

        <ul className="space-y-4">
          {items.map((item, i) => {
            const Icon = iconMap[item.type as keyof typeof iconMap];
            return (
              <li key={i}>
                <a
                  href={item.href}
                  target={item.type === "linkedin" ? "_blank" : undefined}
                  rel={item.type === "linkedin" ? "noreferrer" : undefined}
                  className="inline-flex items-center gap-3 text-lg text-primary hover:underline"
                >
                  {Icon && <Icon className="size-5 shrink-0" />}
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
