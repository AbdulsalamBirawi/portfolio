import { cn } from "@/lib/utils";

/** Shared section shell: eyebrow, heading, animated rule, consistent rhythm. */
export function Section({
  id,
  eyebrow,
  title,
  lead,
  icon,
  className,
  children,
}: {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-20 py-24 sm:py-32", className)}
    >
      <div className="mx-auto w-full max-w-[var(--shell)] px-5 sm:px-8">
        <header className="max-w-3xl">
          <div className="flex items-center gap-3" data-reveal="left">
            {icon && <span className="text-accent-soft">{icon}</span>}
            <p className="eyebrow">{eyebrow}</p>
          </div>
          <h2
            className="h-section mt-5 text-[clamp(2.1rem,5.4vw,3.9rem)] text-balance"
            data-split="lines"
          >
            {title}
          </h2>
          {lead && (
            <p
              className="mt-5 max-w-prose text-lg leading-relaxed text-muted-foreground"
              data-reveal
            >
              {lead}
            </p>
          )}
          <span
            className="mt-9 block h-px w-full bg-gradient-to-r from-accent/70 via-border to-transparent"
            data-draw
            aria-hidden="true"
          />
        </header>

        <div className="mt-12 sm:mt-16">{children}</div>
      </div>
    </section>
  );
}
