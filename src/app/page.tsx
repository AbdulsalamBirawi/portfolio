import { Motion } from "@/components/Motion";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Starfield } from "@/components/Starfield";
import { CursorGlow, ScrollProgress } from "@/components/interactive";
import {
  About,
  Contact,
  Education,
  Experience,
  Footer,
  StackSection,
} from "@/components/sections";

export default function Home() {
  return (
    <div className="grain">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-foreground focus:px-5 focus:py-3 focus:text-sm focus:text-background"
      >
        Skip to content
      </a>

      {/* Ambient layers, behind everything */}
      <Starfield />
      <CursorGlow />
      <ScrollProgress />

      <Nav />

      <Motion>
        <main>
          <Hero />
          <About />
          <Experience />
          <StackSection />
          <Education />
          <Contact />
        </main>
        <Footer />
      </Motion>
    </div>
  );
}
