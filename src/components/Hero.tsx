import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { experience, profile, yearsOfExperience } from "@/content/cv";
import { GridHorizon, OrbitRings } from "@/components/vectors";
import { CountUp, Magnetic, Marquee } from "@/components/interactive";

const STACK_RIBBON = [
  "React",
  "Next.js",
  "TypeScript",
  "Redux Toolkit",
  "React Native",
  "MUI",
  "Tailwind",
  "Node.js",
  "Angular",
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-dvh flex-col justify-center overflow-hidden pt-28 pb-10"
    >
      {/* Layer 1 — Webb's Cosmic Cliffs at full resolution, drifting on scroll */}
      <div className="absolute inset-0 -z-30" data-parallax="14">
        <Image
          src="/images/nebula-carina.jpg"
          alt=""
          fill
          priority
          quality={88}
          sizes="100vw"
          className="scale-[1.15] object-cover object-center opacity-45"
        />
        {/* Vignette + floor fade so type always has contrast */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_60%_35%,transparent,rgba(6,7,12,0.72)_58%,#06070c_92%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Layer 2 — breathing aurora */}
      <div
        className="aurora -left-40 top-10 h-[34rem] w-[34rem] bg-accent/25"
        aria-hidden="true"
      />
      <div
        className="aurora right-[-10rem] top-1/3 h-[28rem] w-[28rem] bg-violet-500/20 [animation-delay:-8s]"
        aria-hidden="true"
      />

      {/* Layer 3 — vector orbits */}
      <div
        className="pointer-events-none absolute -right-40 top-1/2 -z-20 hidden w-[52rem] -translate-y-1/2 opacity-60 lg:block"
        data-parallax="-10"
      >
        <OrbitRings className="h-auto w-full [animation:orbit-spin_220s_linear_infinite]" />
      </div>

      <div className="mx-auto w-full max-w-[var(--shell)] px-5 sm:px-8">
        <p
          className="eyebrow flex items-center gap-2.5"
          data-reveal="left"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          Available for senior front-end roles · {profile.location}
        </p>

        {/* Kinetic display type — characters rise into place */}
        <h1 className="display mt-7 text-[clamp(3rem,10.5vw,8.5rem)]">
          <span className="sr-only">{profile.name}</span>
          <span aria-hidden="true" className="block">
            <span className="shimmer block" data-split>
              Abdalsalam
            </span>
            <span
              className="block text-muted-foreground/80"
              data-split
            >
              Al Birawi
            </span>
          </span>
        </h1>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,34rem)_auto] lg:items-end lg:justify-between">
          <div>
            <p
              className="max-w-prose text-lg leading-relaxed text-secondary sm:text-xl"
              data-split="lines"
            >
              {profile.title} building fintech, identity-verification and
              consumer platforms with React, Next.js and TypeScript.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4" data-reveal>
              <Magnetic>
                <a
                  href={`mailto:${profile.email}`}
                  className="group relative inline-flex min-h-13 items-center gap-2 overflow-hidden rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background"
                >
                  {/* Sheen sweeping across the button on hover */}
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <span className="relative">Start a conversation</span>
                  <ArrowUpRight
                    size={16}
                    weight="bold"
                    aria-hidden="true"
                    className="relative transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </Magnetic>

              <a
                href="#experience"
                className="beam-border inline-flex min-h-13 items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-medium transition-colors duration-300 hover:text-accent-soft"
              >
                See the work
              </a>
            </div>
          </div>

          {/* Stats — counting up as they arrive */}
          <dl
            className="grid grid-cols-3 gap-px overflow-hidden rounded-[var(--radius)] border border-border bg-border/70 backdrop-blur-md lg:w-auto"
            data-stagger
          >
            {[
              { value: yearsOfExperience, suffix: "+", label: "Years shipping" },
              { value: experience.length, suffix: "", label: "Companies" },
              { value: 98, suffix: "%", label: "Graduation grade" },
            ].map((s) => (
              <div
                key={s.label}
                className="group bg-surface/80 px-3.5 py-5 transition-colors duration-300 hover:bg-surface sm:px-8 sm:py-6"
              >
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <CountUp
                    value={s.value}
                    suffix={s.suffix}
                    className="readout block text-2xl font-semibold text-foreground transition-colors duration-300 group-hover:text-accent-soft sm:text-4xl"
                  />
                  <span className="mt-2 block text-[0.7rem] leading-tight text-muted-foreground sm:text-xs">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Tech ribbon, scrolling continuously */}
      <div className="relative mt-14 border-y border-border/60 bg-background/40 backdrop-blur-sm">
        <Marquee items={STACK_RIBBON} />
      </div>

      <GridHorizon className="pointer-events-none absolute inset-x-0 bottom-0 -z-20 h-40 w-full opacity-20" />

      <a
        href="#about"
        className="mx-auto mt-8 flex w-fit items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowDown size={14} aria-hidden="true" className="animate-bounce" />
        Scroll
      </a>
    </section>
  );
}
