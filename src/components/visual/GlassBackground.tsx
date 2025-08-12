import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

const GlassBackground = ({ className = "" }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const blueWrap = useRef<HTMLDivElement | null>(null);
  const redWrap = useRef<HTMLDivElement | null>(null);
  const greenWrap = useRef<HTMLDivElement | null>(null);
  const yellowWrap = useRef<HTMLDivElement | null>(null);

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

  return (
    <div
      aria-hidden
      ref={containerRef}
      className={cn("pointer-events-none fixed inset-0 -z-10 overflow-hidden", className)}
    >
      {/* Animated neon orbs on pure black background with parallax wrappers */}
      <div ref={blueWrap} style={{ position: "absolute", inset: 0 }}>
        <div className="orb orb--blue" style={{ top: "-10%", left: "-10%" }} />
      </div>
      <div ref={redWrap} style={{ position: "absolute", inset: 0 }}>
        <div className="orb orb--red" style={{ top: "20%", right: "-12%", animationDelay: "2s" }} />
      </div>
      <div ref={greenWrap} style={{ position: "absolute", inset: 0 }}>
        <div className="orb orb--green" style={{ bottom: "-12%", left: "28%", animationDelay: "4s" }} />
      </div>
      <div ref={yellowWrap} style={{ position: "absolute", inset: 0 }}>
        <div className="orb orb--yellow" style={{ top: "60%", right: "18%", animationDelay: "6s" }} />
      </div>
    </div>
  );
};

export default GlassBackground;
