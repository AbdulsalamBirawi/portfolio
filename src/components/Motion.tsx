"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * One provider drives every scroll animation on the page.
 *
 * Elements opt in declaratively:
 *   data-reveal            fade + rise as it enters the viewport
 *   data-reveal="left"     slide in from the left
 *   data-reveal="scale"    settle in from slightly small
 *   data-stagger           reveal this element's children in sequence
 *   data-parallax="-14"    drift by this percentage of scroll travel
 *
 * Everything is wrapped in gsap.matchMedia, so `prefers-reduced-motion` skips
 * the motion entirely and renders the final state immediately.
 */
export function Motion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Added here rather than during render: this runs before paint but after
      // hydration, so the server and client markup stay identical, and if this
      // module ever fails to load nothing is left permanently hidden.
      const rootEl = document.documentElement;
      rootEl.classList.add("motion-ready");

      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { reduced } = ctx.conditions as {
            motion: boolean;
            reduced: boolean;
          };

          // Every SplitText instance created in this context, so they can all
          // be restored when the context is torn down.
          const splits: SplitText[] = [];

          if (reduced) {
            gsap.set("[data-reveal], [data-split], [data-stagger] > *", {
              opacity: 1,
              clearProps: "transform",
            });
            return;
          }

          // --- Kinetic type: characters rise into place -------------------
          // SplitText rewrites the element's children, which React does not
          // own. Each split is therefore reverted the moment its animation
          // finishes (and again on teardown), so React's tree and the real DOM
          // never disagree.
          gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
            const mode = el.dataset.split === "lines" ? "lines" : "chars";
            const split = new SplitText(el, {
              type: mode === "lines" ? "lines" : "chars,words",
              linesClass: "split-line",
              // Keep the text as one accessible string for screen readers.
              aria: "none",
            });
            splits.push(split);

            const targets = mode === "lines" ? split.lines : split.chars;
            gsap.set(el, { opacity: 1 });
            gsap.fromTo(
              targets,
              { yPercent: 120, opacity: 0 },
              {
                yPercent: 0,
                opacity: 1,
                duration: mode === "lines" ? 0.9 : 0.7,
                // Per-character stagger is what gives display type its snap.
                stagger: mode === "lines" ? 0.09 : 0.022,
                ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 90%" },
                onComplete: () => {
                  split.revert();
                  // revert() restores the element's original inline styles,
                  // so re-assert visibility against the hide rule.
                  el.style.opacity = "1";
                },
              },
            );
          });

          // --- Individual reveals ---------------------------------------
          const reveals = gsap.utils.toArray<HTMLElement>(
            "[data-reveal]:not([data-stagger] *)",
          );
          reveals.forEach((el) => {
            const kind = el.dataset.reveal || "up";
            const from: gsap.TweenVars = { opacity: 0 };
            if (kind === "left") from.x = -48;
            else if (kind === "right") from.x = 48;
            else if (kind === "scale") from.scale = 0.94;
            else from.y = 44;

            // fromTo, never from: these elements are hidden by CSS, and
            // gsap.from() would read that 0 as the destination value and
            // animate from invisible to invisible.
            gsap.fromTo(
              el,
              from,
              {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 88%",
                  toggleActions: "play none none none",
                },
              },
            );
          });

          // --- Staggered groups -----------------------------------------
          gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
            gsap.fromTo(
              Array.from(group.children),
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                // 30–50ms per item keeps a list from feeling either
                // simultaneous or sluggish.
                stagger: 0.06,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: group,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              },
            );
          });

          // --- Parallax layers ------------------------------------------
          gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
            const amount = Number(el.dataset.parallax) || -12;
            gsap.to(el, {
              yPercent: amount,
              ease: "none",
              scrollTrigger: {
                trigger: el.parentElement ?? el,
                start: "top bottom",
                end: "bottom top",
                // Scrub ties the movement to the scrollbar instead of
                // firing a fixed-length tween.
                scrub: 1,
              },
            });
          });

          // --- Section heading rules draw themselves in -------------------
          gsap.utils.toArray<HTMLElement>("[data-draw]").forEach((el) => {
            gsap.fromTo(
              el,
              { scaleX: 0 },
              {
                scaleX: 1,
                transformOrigin: "left center",
                duration: 1.1,
                ease: "power3.inOut",
                scrollTrigger: { trigger: el, start: "top 90%" },
              },
            );
          });

          return () =>
            splits.forEach((s) => {
              s.revert();
              (s.elements as HTMLElement[]).forEach((el) => {
                el.style.opacity = "1";
              });
            });
        },
      );

      // Images and fonts change layout height; recalculate once they land.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      document.fonts?.ready.then(refresh);

      return () => {
        window.removeEventListener("load", refresh);
        rootEl.classList.remove("motion-ready");
        mm.revert();
      };
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}
