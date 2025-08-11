import GlassBackground from "@/components/visual/GlassBackground";
import { setPageSEO } from "@/lib/seo";
import { Bike } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const milestones = [
  { year: "10th Grade", text: "Sparked curiosity in tech" },
  { year: "MCA", text: "Mastered CS fundamentals" },
  { year: "Internships", text: "Built real products" },
  { year: "Open-source", text: "Contributed and learned" },
  { year: "Current", text: "AI Engineer crafting experiences" },
];

const Journey = () => {
  setPageSEO({ title: "My Journey", description: "An interactive timeline of Piyush’s journey from school to present." });
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "calc(100% - 2rem)"]);

  return (
    <main className="min-h-screen relative">
      <GlassBackground />
      <section className="container mx-auto px-4 pt-28 pb-24">
        <header className="mb-8">
          <h1 className="font-display text-3xl tracking-wider">My Journey</h1>
          <p className="text-muted-foreground mt-2">Scroll to ride along the neon road</p>
        </header>

        <div ref={ref} className="relative glass rounded-xl p-6 overflow-hidden">
          {/* Road */}
          <div className="relative h-40 md:h-48">
            <div className="absolute left-2 right-2 top-1/2 -translate-y-1/2 h-2 rounded-full bg-[hsl(var(--foreground)/0.15)]" />
            <motion.div style={{ x }} className="absolute top-1/2 -translate-y-1/2">
              <div className="neon-ring rounded-full p-2 bg-[hsl(var(--background)/0.6)]">
                <Bike />
              </div>
            </motion.div>
          </div>

          {/* Milestones */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-4">
            {milestones.map((m) => (
              <motion.article key={m.year} initial={{ y: 10, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="glass rounded-lg p-4 text-center animate-float">
                <h3 className="font-medium tracking-wide">{m.year}</h3>
                <p className="text-sm text-muted-foreground mt-1">{m.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Journey;
