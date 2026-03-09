import type { Route } from "./+types/home";
import {
  Header,
  Hero,
  About,
  Projects,
  Experience,
  Skills,
  Education,
  Contact,
} from "../components";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Portfolio" },
    { name: "description", content: "My career portfolio and projects" },
  ];
}

export default function Home() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
    </>
  );
}
