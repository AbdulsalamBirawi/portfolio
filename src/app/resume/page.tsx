import type { Metadata } from "next";
import Link from "next/link";
import {
  awards,
  education,
  experience,
  languages,
  profile,
  references,
  skills,
} from "@/content/cv";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${profile.name} — ${profile.title}. React, Next.js, TypeScript.`,
};

function SkillBar({ name, level }: { name: string; level: number }) {
  return (
    <li className="grid grid-cols-[minmax(6rem,8rem)_1fr] items-center gap-3">
      <span className="font-mono text-sm">{name}</span>
      <span
        className="h-2.5 w-full bg-muted"
        role="img"
        aria-label={`${name}: ${level} out of 100`}
      >
        <span
          className="block h-full bg-secondary"
          style={{ width: `${level}%` }}
        />
      </span>
    </li>
  );
}

export default function ResumePage() {
  return (
    <main
      id="main"
      className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-16"
    >
      <header className="border-b border-border pb-8">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-secondary">
          Plain resume
        </p>
        <h1 className="mt-3 font-mono text-3xl font-bold sm:text-4xl">
          {profile.name}
        </h1>
        <p className="mt-2 text-lg text-secondary">{profile.title}</p>
        <p className="mt-4 max-w-prose leading-relaxed text-muted-foreground">
          {profile.summary}
        </p>

        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
          <li>
            <a
              className="underline decoration-secondary underline-offset-4 hover:text-secondary"
              href={`mailto:${profile.email}`}
            >
              {profile.email}
            </a>
          </li>
          <li>
            <a
              className="underline decoration-secondary underline-offset-4 hover:text-secondary"
              href={`tel:${profile.phone.replace(/\s/g, "")}`}
            >
              {profile.phone}
            </a>
          </li>
          <li className="text-muted-foreground">{profile.location}</li>
          <li>
            <a
              className="underline decoration-secondary underline-offset-4 hover:text-secondary"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </li>
        </ul>

        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 items-center border border-border bg-card px-5 font-mono text-sm font-bold uppercase tracking-widest text-foreground transition-colors duration-200 hover:bg-primary hover:text-primary-foreground"
        >
          Back to the portfolio
        </Link>
      </header>

      <section aria-labelledby="experience-heading" className="mt-12">
        <h2
          id="experience-heading"
          className="font-mono text-xs uppercase tracking-[0.3em] text-secondary"
        >
          Work experience
        </h2>
        <ol className="mt-6 space-y-10">
          {experience.map((job) => (
            <li key={`${job.company}-${job.period}`}>
              <h3 className="font-mono text-lg font-bold">{job.role}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {job.company} · {job.location} ·{" "}
                <span className="tabular-nums">{job.period}</span>
              </p>
              <ul className="mt-4 space-y-3">
                {job.bullets.map((b) => (
                  <li
                    key={b.title}
                    className="border-l border-border pl-4 leading-relaxed"
                  >
                    <strong className="font-semibold text-foreground">
                      {b.title}:
                    </strong>{" "}
                    <span className="text-muted-foreground">{b.body}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="skills-heading" className="mt-12">
        <h2
          id="skills-heading"
          className="font-mono text-xs uppercase tracking-[0.3em] text-secondary"
        >
          Stack
        </h2>
        <div className="mt-6 grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="font-mono text-sm font-bold uppercase">Proficient</h3>
            <ul className="mt-4 space-y-3">
              {skills.proficient.map((s) => (
                <SkillBar key={s.name} {...s} />
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-sm font-bold uppercase">Familiar</h3>
            <ul className="mt-4 space-y-3">
              {skills.familiar.map((s) => (
                <SkillBar key={s.name} {...s} />
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="education-heading" className="mt-12">
        <h2
          id="education-heading"
          className="font-mono text-xs uppercase tracking-[0.3em] text-secondary"
        >
          Education & awards
        </h2>
        <p className="mt-6 font-mono text-lg font-bold">{education.degree}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {education.school} · <span className="tabular-nums">{education.period}</span>
        </p>
        <ul className="mt-6 space-y-3">
          {awards.map((a) => (
            <li key={a.title} className="border-l border-border pl-4">
              <strong className="font-semibold">{a.title}</strong>
              <p className="text-muted-foreground">{a.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="languages-heading" className="mt-12">
        <h2
          id="languages-heading"
          className="font-mono text-xs uppercase tracking-[0.3em] text-secondary"
        >
          Languages
        </h2>
        <ul className="mt-6 flex flex-wrap gap-3">
          {languages.map((l) => (
            <li
              key={l.name}
              className="border border-border bg-card px-4 py-2 font-mono text-sm"
            >
              {l.name}{" "}
              <span className="text-muted-foreground">— {l.level}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="references-heading" className="mt-12">
        <h2
          id="references-heading"
          className="font-mono text-xs uppercase tracking-[0.3em] text-secondary"
        >
          References
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {references.map((r) => (
            <li key={r.email} className="panel p-4">
              <p className="font-mono font-bold">{r.name}</p>
              <p className="text-sm text-muted-foreground">{r.role}</p>
              <a
                className="mt-2 inline-block break-all text-sm underline decoration-secondary underline-offset-4 hover:text-secondary"
                href={`mailto:${r.email}`}
              >
                {r.email}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <footer className="mt-16 border-t border-border pt-6 font-mono text-xs text-muted-foreground">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </main>
  );
}
