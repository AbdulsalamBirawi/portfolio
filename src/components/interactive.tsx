"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------- Scroll progress */

/** Hairline progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      raf = 0;
    };
    const onScroll = () => {
      // Coalesce scroll events into one write per frame.
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-px bg-transparent"
    >
      <div
        ref={bar}
        className="h-full origin-left bg-gradient-to-r from-accent via-accent-soft to-violet-400"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}

/* ----------------------------------------------------------- Cursor glow */

/** Soft light that trails the pointer. Fine pointers only. */
export function CursorGlow() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const pos = { x: innerWidth / 2, y: innerHeight / 2, tx: 0, ty: 0 };
    pos.tx = pos.x;
    pos.ty = pos.y;
    let raf = 0;

    const move = (e: PointerEvent) => {
      pos.tx = e.clientX;
      pos.ty = e.clientY;
      if (dot.current) dot.current.style.opacity = "1";
    };
    const leave = () => {
      if (dot.current) dot.current.style.opacity = "0";
    };

    const loop = () => {
      // Lag behind the cursor slightly so it reads as light, not a cursor.
      pos.x += (pos.tx - pos.x) * 0.12;
      pos.y += (pos.ty - pos.y) * 0.12;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${pos.x - 260}px, ${
          pos.y - 260
        }px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div
      ref={dot}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 -z-30 h-[520px] w-[520px] opacity-0 transition-opacity duration-500 [background:radial-gradient(circle,rgba(59,130,246,0.13),rgba(59,130,246,0.04)_40%,transparent_68%)]"
    />
  );
}

/* ------------------------------------------------------------- Count up */

/** Counts from zero to `value` the first time it scrolls into view. */
export function CountUp({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // A ref, not state: the count is a DOM effect and must not re-render.
  const played = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || played.current) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      played.current = true;
      el.textContent = `${value}${suffix}`;
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played.current) return;
        played.current = true;
        io.disconnect();
        const duration = 1100;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          // Ease out so it decelerates into the final number.
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = `${Math.round(value * eased)}${suffix}`;
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [value, suffix]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}

/* -------------------------------------------------------- Spotlight card */

/**
 * Card that lights up under the pointer and tilts a few degrees towards it.
 * Purely decorative enhancement — the card works untouched without it.
 */
export function SpotlightCard({
  className,
  tilt = true,
  children,
  as: Tag = "div",
  ...rest
}: React.HTMLAttributes<HTMLElement> & {
  className?: string;
  tilt?: boolean;
  as?: React.ElementType;
  /** Present when rendered `as="a"`. */
  href?: string;
  target?: string;
  rel?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--spot-x", `${x}px`);
    el.style.setProperty("--spot-y", `${y}px`);
    if (tilt && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const rx = ((y / r.height) * 2 - 1) * -3.5;
      const ry = ((x / r.width) * 2 - 1) * 3.5;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
  };

  return (
    <Tag
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("spotlight", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* --------------------------------------------------------- Magnetic CTA */

/** Button wrapper that drifts a few pixels towards the pointer. */
export function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="inline-block transition-transform duration-300 ease-out"
    >
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------- Marquee */

/** Seamless scrolling ribbon. The list is duplicated to loop without a seam. */
export function Marquee({ items }: { items: string[] }) {
  return (
    <div
      className="marquee relative flex overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      aria-hidden="true"
    >
      {[0, 1].map((copy) => (
        <ul key={copy} className="marquee-track flex shrink-0 items-center gap-10 pr-10">
          {items.map((item) => (
            <li
              key={`${copy}-${item}`}
              className="flex items-center gap-10 whitespace-nowrap text-lg font-medium text-muted-foreground transition-colors"
            >
              {item}
              <span className="h-1 w-1 rounded-full bg-accent/60" />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
