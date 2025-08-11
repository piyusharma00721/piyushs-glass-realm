import GlassBackground from "@/components/visual/GlassBackground";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { setPageSEO } from "@/lib/seo";
import { BadgeCheck, Cpu, Layers, MessageSquareCode, Rocket } from "lucide-react";

const skills = {
  Programming: ["TypeScript", "Python", "Go"],
  Frameworks: ["React", "Node.js", "Tailwind"],
  Tools: ["Docker", "Git", "PostgreSQL"],
  "Soft Skills": ["Leadership", "Communication", "Problem Solving"],
};

const icon = (name: string) => {
  const base = "opacity-80";
  if (name === "TypeScript" || name === "React" || name === "Node.js") return <MessageSquareCode className={base} />;
  if (name === "Python" || name === "Go") return <Cpu className={base} />;
  if (name === "Tailwind" || name === "Docker" || name === "Git" || name === "PostgreSQL") return <Layers className={base} />;
  return <BadgeCheck className={base} />;
};

const Index = () => {
  setPageSEO({ title: "Home", description: "Piyush’s Relm — Building AI solutions & futuristic ideas." });

  return (
    <main className="min-h-screen relative">
      <GlassBackground />

      {/* Hero */}
      <section className="container mx-auto px-4 pt-28 pb-20 text-center">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-widest">Piyush</h1>
          <p className="mt-4 text-lg text-muted-foreground">Building AI solutions & futuristic ideas</p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link to="/projects">
              <Button variant="hero" size="xl" className="rounded-full">View Projects <Rocket /></Button>
            </Link>
            <a href="#skills">
              <Button variant="glass" size="xl" className="rounded-full">Skills</Button>
            </a>
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="container mx-auto px-4 pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl tracking-wider">Skills</h2>
          <p className="text-muted-foreground mt-2">Transparent panels with neon hover glow</p>
        </div>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {Object.entries(skills).map(([group, items]) => (
            <div key={group} className="glass rounded-xl p-5">
              <h3 className="font-medium tracking-wide">{group}</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {items.map((s) => (
                  <span key={s} className="skill-pill"><span className="inline-flex items-center gap-2">{icon(s)}<span>{s}</span></span></span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Index;
