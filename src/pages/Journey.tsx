import GlassBackground from "@/components/visual/GlassBackground";
import { setPageSEO } from "@/lib/seo";
import { Bike } from "lucide-react";
import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const milestones = [
  { year: "10th Grade", text: "Sparked curiosity in tech" },
  { year: "MCA", text: "Mastered CS fundamentals" },
  { year: "Internships", text: "Built real products" },
  { year: "Open-source", text: "Contributed and learned" },
  { year: "Current", text: "AI Engineer crafting experiences" },
];

const Journey = () => {
  setPageSEO({ title: "My Journey", description: "An interactive timeline of Piyush’s journey from school to present." });
  const trackRef = useRef<HTMLDivElement | null>(null);
  const bikeX = useMotionValue(0);
  const [active, setActive] = useState(0);
  const [trackW, setTrackW] = useState(0);

  useEffect(() => {
    const update = () => setTrackW(trackRef.current?.clientWidth ?? 0);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const positions = milestones.map((_, i) =>
    (i / Math.max(1, milestones.length - 1)) * Math.max(0, trackW - 64)
  );

  const snapTo = (i: number) => {
    const target = positions[i] ?? 0;
    animate(bikeX, target, { type: "spring", stiffness: 400, damping: 36 });
    setActive(i);
  };

  const handleDragEnd = () => {
    const x = bikeX.get();
    let nearest = 0;
    for (let i = 1; i < positions.length; i++) {
      if (Math.abs(positions[i] - x) < Math.abs(positions[nearest] - x)) nearest = i;
    }
    snapTo(nearest);
  };
  return (
    <main className="min-h-screen relative">
      <GlassBackground />
      <section className="container mx-auto px-4 pt-28 pb-24">
        <header className="mb-8">
          <h1 className="font-display text-3xl tracking-wider">My Journey</h1>
          <p className="text-muted-foreground mt-2">Scroll to ride along the neon road</p>
        </header>

        <div className="relative glass rounded-xl p-6 overflow-hidden">
          {/* Road */}
          <div ref={trackRef} className="relative h-40 md:h-48">
            <div className="absolute left-2 right-2 top-1/2 -translate-y-1/2 h-2 rounded-full bg-[hsl(var(--foreground)/0.15)]" />
            <motion.div
              style={{ x: bikeX }}
              drag="x"
              dragElastic={0.1}
              dragMomentum={false}
              dragConstraints={{ left: 0, right: Math.max(0, trackW - 64) }}
              onDragEnd={handleDragEnd}
              className="absolute left-2 top-1/2 -translate-y-1/2"
              whileTap={{ scale: 0.98 }}
            >
              <div className="neon-ring rounded-full p-2 bg-[hsl(var(--background)/0.6)]">
                <Bike />
              </div>
            </motion.div>
          </div>

          {/* Milestones */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-4">
            {milestones.map((m, i) => (
              <motion.article
                key={m.year}
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                onClick={() => snapTo(i)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && snapTo(i)}
                role="button"
                tabIndex={0}
                className={`glass rounded-lg p-4 text-center animate-float ${
                  active === i ? "shadow-[0_0_24px_hsl(var(--primary)/0.35)]" : ""
                }`}
              >
                <h3 className="font-medium tracking-wide">{m.year}</h3>
                <p className="text-sm text-muted-foreground mt-1">{m.text}</p>
                {active === i && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-xs text-primary/90">
                    Reached: {m.year}
                  </motion.div>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Journey;
