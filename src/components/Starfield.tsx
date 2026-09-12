"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number; // 0..1 depth — drives size, brightness and parallax
  twinkle: number;
  phase: number;
};

type Shooter = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
};

/**
 * Live star field on a canvas: three parallax depths that drift continuously,
 * lean towards the pointer, and throw the occasional shooting star.
 *
 * Cheap by design — a few hundred filled arcs per frame, paused whenever the
 * tab is hidden, and replaced by a single static render under reduced motion.
 */
export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let stars: Star[] = [];
    const shooters: Shooter[] = [];

    // Pointer influence, eased towards the real cursor each frame.
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Density scales with area so large screens do not look empty.
      const count = Math.min(520, Math.round((width * height) / 5200));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random(),
        twinkle: 0.4 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const drawStar = (s: Star, t: number) => {
      const depth = 0.35 + s.z * 0.65;
      const px = s.x + pointer.x * (1 - s.z) * 26;
      const py = s.y + pointer.y * (1 - s.z) * 26;
      if (px < -4 || px > width + 4) return;

      const flicker = reduced
        ? 1
        : 0.65 + Math.sin(t * 0.0014 * s.twinkle + s.phase) * 0.35;
      const alpha = depth * flicker * 0.95;
      const r = 0.35 + s.z * 1.25;

      ctx.beginPath();
      ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(226,234,246,${alpha.toFixed(3)})`;
      ctx.fill();

      // The brightest few get a soft bloom.
      if (s.z > 0.86) {
        ctx.beginPath();
        ctx.arc(px, py, r * 3.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147,197,253,${(alpha * 0.14).toFixed(3)})`;
        ctx.fill();
      }
    };

    const spawnShooter = () => {
      const fromLeft = Math.random() > 0.5;
      const speed = 6 + Math.random() * 5;
      shooters.push({
        x: fromLeft ? -40 : width + 40,
        y: Math.random() * height * 0.55,
        vx: fromLeft ? speed : -speed,
        vy: speed * (0.35 + Math.random() * 0.3),
        life: 0,
        maxLife: 60 + Math.random() * 30,
      });
    };

    let raf = 0;
    let last = performance.now();
    let sinceShooter = 0;

    const frame = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;

      ctx.clearRect(0, 0, width, height);

      // Ease the parallax so the field glides rather than snapping.
      pointer.x += (pointer.tx - pointer.x) * 0.045;
      pointer.y += (pointer.ty - pointer.y) * 0.045;

      for (const s of stars) {
        // Continuous drift; wrap around the edges.
        s.x -= (0.004 + s.z * 0.012) * dt;
        if (s.x < -2) {
          s.x = width + 2;
          s.y = Math.random() * height;
        }
        drawStar(s, now);
      }

      // Shooting stars, roughly one every six seconds.
      sinceShooter += dt;
      if (sinceShooter > 6000 && Math.random() < 0.03) {
        sinceShooter = 0;
        spawnShooter();
      }

      for (let i = shooters.length - 1; i >= 0; i -= 1) {
        const sh = shooters[i];
        sh.x += sh.vx;
        sh.y += sh.vy;
        sh.life += 1;
        const fade = 1 - sh.life / sh.maxLife;
        if (fade <= 0) {
          shooters.splice(i, 1);
          continue;
        }
        const tailX = sh.x - sh.vx * 9;
        const tailY = sh.y - sh.vy * 9;
        const grad = ctx.createLinearGradient(tailX, tailY, sh.x, sh.y);
        grad.addColorStop(0, "rgba(147,197,253,0)");
        grad.addColorStop(1, `rgba(226,240,255,${(fade * 0.9).toFixed(3)})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(sh.x, sh.y);
        ctx.stroke();
      }

      raf = requestAnimationFrame(frame);
    };

    const renderStatic = () => {
      ctx.clearRect(0, 0, width, height);
      for (const s of stars) drawStar(s, 0);
    };

    const onPointerMove = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const onResize = () => {
      build();
      if (reduced) renderStatic();
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (!reduced) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    build();
    if (reduced) {
      renderStatic();
    } else {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      raf = requestAnimationFrame(frame);
    }
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-40 h-full w-full"
    />
  );
}
