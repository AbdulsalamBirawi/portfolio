import Image from "next/image";
import {
  ArrowUpRight,
  Buildings,
  Envelope,
  GraduationCap,
  LinkedinLogo,
  MapPin,
  Phone,
  Stack,
  Trophy,
} from "@phosphor-icons/react/dist/ssr";
import {
  awards,
  education,
  experience,
  languages,
  profile,
  references,
  skills,
  type Skill,
} from "@/content/cv";
import { Section } from "@/components/Section";
import { SpotlightCard } from "@/components/interactive";
import { Constellation, SatelliteMark, SignalArc } from "@/components/vectors";

/* -------------------------------------------------------------- About --- */

export function About() {
  return (
    <Section
      id="about"
      eyebrow="Mission profile"
      title={<>Engineering interfaces that hold up under pressure.</>}
      icon={<SatelliteMark className="h-6 w-6" />}
    >
      <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div className="space-y-6 text-lg leading-relaxed text-secondary" data-reveal>
          <p>{profile.summary}</p>
          <p className="text-muted-foreground">
            Most of my work sits where design meets reliability: architecting
            front ends that scale, standardising UI systems so teams move
            faster, and integrating the APIs that make a product actually
            useful — payments, expense flows, and multi-channel verification
            over SMS, email, voice, WhatsApp and Nafath.
          </p>

          <dl className="grid gap-px overflow-hidden rounded-[var(--radius)] border border-border bg-border sm:grid-cols-2">
            {[
              { k: "Based in", v: profile.location, icon: MapPin },
              { k: "Focus", v: profile.tagline, icon: Stack },
              { k: "Currently", v: experience[0].company, icon: Buildings },
              { k: "Degree", v: "BSc Software Engineering", icon: GraduationCap },
            ].map(({ k, v, icon: Icon }) => (
              <div key={k} className="bg-surface p-5">
                <dt className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Icon size={14} aria-hidden="true" />
                  {k}
                </dt>
                <dd className="mt-1.5 text-base text-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="relative" data-reveal="right">
          <div className="group relative aspect-[4/5] overflow-hidden rounded-[var(--radius)] border border-border">
            <Image
              src="/images/earth-limb.jpg"
              alt="Earth's atmospheric limb photographed from the International Space Station, the thin blue line of the atmosphere against black space."
              fill
              quality={88}
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-5">
              <p className="readout text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
                NASA · ISS Expedition 28
              </p>
              <p className="mt-1 text-sm text-secondary">
                The thin line everything depends on.
              </p>
            </figcaption>
          </div>
        </figure>
      </div>
    </Section>
  );
}

/* --------------------------------------------------------- Experience --- */

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Flight history"
      title="Six years, five teams, one discipline."
      lead="From a first foundation in HTML and CSS to owning front-end architecture end to end."
      className="nebula-glow"
    >
      <div className="relative overflow-x-clip">
        <div
          className="aurora -left-32 top-1/4 h-[26rem] w-[26rem] bg-accent/15"
          aria-hidden="true"
        />
        <Constellation
          className="pointer-events-none absolute -top-24 right-0 hidden h-40 w-[32rem] opacity-40 lg:block"
          aria-hidden="true"
        />

        <ol className="relative space-y-4">
          {/* Timeline spine */}
          <span
            className="absolute left-[7px] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-accent/60 via-border to-transparent sm:block"
            aria-hidden="true"
          />

          {experience.map((job, i) => (
            <li key={`${job.company}-${job.period}`} className="sm:pl-12" data-reveal>
              {/* Node */}
              <span
                className="absolute left-0 mt-7 hidden h-4 w-4 items-center justify-center rounded-full border border-border bg-background sm:flex"
                aria-hidden="true"
              >
                <span
                  className={
                    i === 0
                      ? "h-1.5 w-1.5 rounded-full bg-accent [animation:twinkle_2.4s_ease-in-out_infinite]"
                      : "h-1.5 w-1.5 rounded-full bg-muted-foreground"
                  }
                />
              </span>

              <SpotlightCard
                as="article"
                className="beam-border group rounded-[var(--radius)] border border-border bg-surface/60 p-6 hover:border-accent/40 sm:p-8"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                      {job.role}
                    </h3>
                    <p className="mt-1.5 text-base text-accent-soft">
                      {job.company}
                      <span className="text-muted-foreground"> · {job.location}</span>
                    </p>
                  </div>
                  <p className="readout text-sm text-muted-foreground">{job.period}</p>
                </div>

                <ul className="mt-6 grid gap-4">
                  {job.bullets.map((b) => (
                    <li key={b.title} className="border-l border-border pl-4">
                      <h4 className="text-sm font-medium text-foreground">
                        {b.title}
                      </h4>
                      <p className="mt-1 leading-relaxed text-muted-foreground">
                        {b.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------- Stack --- */

function SkillMeter({ skill, tone }: { skill: Skill; tone: "accent" | "muted" }) {
  return (
    <li className="group">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-base text-foreground">{skill.name}</span>
        <span className="readout text-xs text-muted-foreground">{skill.level}</span>
      </div>
      <div
        className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-muted"
        role="img"
        aria-label={`${skill.name}: ${skill.level} out of 100`}
      >
        <span
          className={
            tone === "accent"
              ? "block h-full rounded-full bg-gradient-to-r from-accent to-accent-soft transition-[width] duration-700"
              : "block h-full rounded-full bg-secondary/50 transition-[width] duration-700"
          }
          style={{ width: `${skill.level}%` }}
        />
      </div>
    </li>
  );
}

export function StackSection() {
  return (
    <Section
      id="stack"
      eyebrow="Instrumentation"
      title="The tools I reach for."
      lead="Deep in the React ecosystem, comfortable enough elsewhere to work across the stack when a feature needs it."
      icon={<Stack size={24} aria-hidden="true" />}
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div data-reveal="left">
          <h3 className="eyebrow">Proficient</h3>
          <ul className="mt-7 grid gap-6" data-stagger>
            {skills.proficient.map((s) => (
              <SkillMeter key={s.name} skill={s} tone="accent" />
            ))}
          </ul>
        </div>
        <div data-reveal="right">
          <h3 className="eyebrow">Familiar</h3>
          <ul className="mt-7 grid gap-6" data-stagger>
            {skills.familiar.map((s) => (
              <SkillMeter key={s.name} skill={s} tone="muted" />
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------- Education --- */

export function Education() {
  return (
    <Section
      id="education"
      eyebrow="Credentials"
      title="Training and recognition."
      icon={<Trophy size={24} aria-hidden="true" />}
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <SpotlightCard
          as="article"
          tilt={false}
          className="glass beam-border relative overflow-hidden p-7 lg:col-span-2"
          data-reveal
        >
          <Image
            src="/images/aurora.jpg"
            alt=""
            fill
            quality={80}
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover opacity-20"
          />
          <div className="relative">
            <p className="eyebrow">{education.period}</p>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
              {education.degree}
            </h3>
            <p className="mt-2 text-lg text-accent-soft">{education.school}</p>

            <ul className="mt-8 grid gap-4" data-stagger>
              {awards.map((a) => (
                <li key={a.title} className="flex gap-3">
                  <Trophy
                    size={18}
                    className="mt-0.5 shrink-0 text-accent-soft"
                    aria-hidden="true"
                  />
                  <div>
                    <h4 className="font-medium">{a.title}</h4>
                    <p className="text-muted-foreground">{a.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </SpotlightCard>

        <SpotlightCard as="article" tilt={false} className="glass p-7" data-reveal="right">
          <h3 className="eyebrow">Languages</h3>
          <ul className="mt-7 grid gap-6" data-stagger>
            {languages.map((l) => (
              <li key={l.name}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-base">{l.name}</span>
                  <span className="text-xs text-muted-foreground">{l.level}</span>
                </div>
                <div
                  className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-muted"
                  role="img"
                  aria-label={`${l.name}: ${l.level}`}
                >
                  <span
                    className="block h-full rounded-full bg-gradient-to-r from-accent to-accent-soft"
                    style={{ width: `${l.value}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </SpotlightCard>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------ Contact --- */

export function Contact() {
  const channels = [
    { icon: Envelope, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    {
      icon: Phone,
      label: "Phone",
      value: profile.phone,
      href: `tel:${profile.phone.replace(/\s/g, "")}`,
    },
    { icon: LinkedinLogo, label: "LinkedIn", value: "Connect", href: profile.linkedin },
  ];

  return (
    <Section
      id="contact"
      eyebrow="Open channel"
      title="Let's build something worth shipping."
      lead="Open to senior front-end roles and selective freelance work. The fastest way to reach me is email."
      icon={<SignalArc className="h-6 w-6" />}
    >
      <div className="grid gap-6 lg:grid-cols-3" data-stagger>
        {channels.map(({ icon: Icon, label, value, href }) => (
          <SpotlightCard
            as="a"
            key={label}
            href={href}
            {...(href.startsWith("http")
              ? { target: "_blank", rel: "noreferrer" }
              : {})}
            className="group glass beam-border flex min-h-28 flex-col justify-between p-6 hover:border-accent/50"
          >
            <div className="flex items-center justify-between">
              <Icon size={20} className="text-accent-soft" aria-hidden="true" />
              <ArrowUpRight
                size={16}
                aria-hidden="true"
                className="text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
              />
            </div>
            <div className="mt-6">
              <p className="eyebrow">{label}</p>
              <p className="mt-1.5 break-all text-base text-foreground">{value}</p>
            </div>
          </SpotlightCard>
        ))}
      </div>

      <div className="mt-14" data-reveal>
        <h3 className="eyebrow">References</h3>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {references.map((r) => (
            <SpotlightCard
              as="figure"
              key={r.email}
              className="rounded-[var(--radius)] border border-border p-6"
            >
              <figcaption>
                <p className="font-medium">{r.name}</p>
                <p className="text-sm text-muted-foreground">{r.role}</p>
              </figcaption>
              <a
                href={`mailto:${r.email}`}
                className="mt-3 inline-block break-all text-sm text-accent-soft underline-offset-4 hover:underline"
              >
                {r.email}
              </a>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------- Footer --- */

export function Footer() {
  return (
    <footer className="hairline relative overflow-hidden">
      <div className="starfield pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto flex w-full max-w-[var(--shell)] flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="readout text-xs text-muted-foreground">
          Imagery courtesy of NASA · Built with Next.js
        </p>
      </div>
    </footer>
  );
}
