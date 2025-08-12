import { cn } from "@/lib/utils";
import { useEffect, useRef, useMemo } from "react";

const GlassBackground = ({ className = "" }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const blueWrap = useRef<HTMLDivElement | null>(null);
  const redWrap = useRef<HTMLDivElement | null>(null);
  const greenWrap = useRef<HTMLDivElement | null>(null);
  const yellowWrap = useRef<HTMLDivElement | null>(null);
  const blueOrb = useRef<HTMLDivElement | null>(null);
  const redOrb = useRef<HTMLDivElement | null>(null);
  const greenOrb = useRef<HTMLDivElement | null>(null);
  const yellowOrb = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let raf: number | null = null;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const nx = (e.clientX / w) * 2 - 1; // -1..1
      const ny = (e.clientY / h) * 2 - 1; // -1..1
      // Invert Y for a natural feel
      target.x = nx;
      target.y = ny * -1;
    };

    const animate = () => {
      // Lerp towards target for smoothness
      current.x += (target.x - current.x) * 0.07;
      current.y += (target.y - current.y) * 0.07;

      // Apply subtle parallax to each orb wrapper (in px)
      const apply = (el: HTMLDivElement | null, fx: number, fy: number) => {
        if (!el) return;
        const tx = (current.x * fx).toFixed(2);
        const ty = (current.y * fy).toFixed(2);
        el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      };

      apply(blueWrap.current, 16, 12);
      apply(redWrap.current, -12, 10);
      apply(greenWrap.current, 10, -8);
      apply(yellowWrap.current, -8, -10);

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Auto-move orbs with smooth looping paths using rAF
  useEffect(() => {
    let raf: number | null = null;
    const start = performance.now();

    // Randomized path params for each orb
    const params = [
      { el: blueOrb, ax: 0.35, ay: 0.28, sx: 0.00012, sy: 0.00016, px: Math.random() * Math.PI * 2, py: Math.random() * Math.PI * 2 },
      { el: redOrb, ax: 0.30, ay: 0.34, sx: 0.00010, sy: 0.00014, px: Math.random() * Math.PI * 2, py: Math.random() * Math.PI * 2 },
      { el: greenOrb, ax: 0.32, ay: 0.26, sx: 0.00014, sy: 0.00011, px: Math.random() * Math.PI * 2, py: Math.random() * Math.PI * 2 },
      { el: yellowOrb, ax: 0.28, ay: 0.30, sx: 0.00011, sy: 0.00013, px: Math.random() * Math.PI * 2, py: Math.random() * Math.PI * 2 },
    ];

    const loop = (t: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cx = w * 0.5;
      const cy = h * 0.5;
      const size = 520; // orb size from CSS

      for (const p of params) {
        const time = t - start;
        const x = cx + Math.sin(time * p.sx + p.px) * (w * p.ax) - size / 2;
        const y = cy + Math.cos(time * p.sy + p.py) * (h * p.ay) - size / 2;
        const el = p.el.current;
        if (el) {
          el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
        }
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => { if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <div
      aria-hidden
      ref={containerRef}
      className={cn("pointer-events-none fixed inset-0 -z-10 overflow-hidden", className)}
      style={{ backgroundColor: "#000" }}
    >
      {/* Animated neon orbs on pure black background with parallax wrappers */}
      <div ref={blueWrap} style={{ position: "absolute", inset: 0 }}>
        <div ref={blueOrb} className="orb orb--blue" style={{ animation: "none" }} />
      </div>
      <div ref={redWrap} style={{ position: "absolute", inset: 0 }}>
        <div ref={redOrb} className="orb orb--red" style={{ animation: "none" }} />
      </div>
      <div ref={greenWrap} style={{ position: "absolute", inset: 0 }}>
        <div ref={greenOrb} className="orb orb--green" style={{ animation: "none" }} />
      </div>
      <div ref={yellowWrap} style={{ position: "absolute", inset: 0 }}>
        <div ref={yellowOrb} className="orb orb--yellow" style={{ animation: "none" }} />
      </div>
    </div>
  );
};

export default GlassBackground;
