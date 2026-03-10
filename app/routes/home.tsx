import { useEffect } from "react";
import type { Route } from "./+types/home";
import { Header, Hero, About, Projects, Experience, Skills, Contact } from "../components";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "JChurin - Frontend Engineer" },
    { name: "description", content: "My career portfolio and projects" },
  ];
}

export default function Home() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, []);

  return (
    <>
      <Header />
      <main className="container mx-auto px-2 sm:px-4">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
