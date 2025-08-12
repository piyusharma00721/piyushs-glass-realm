import GlassBackground from "@/components/visual/GlassBackground";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { setPageSEO } from "@/lib/seo";
import { BadgeCheck, Cpu, Layers, MessageSquareCode, Rocket, Bike } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ProjectCard, type Project } from "@/components/cards/ProjectCard";
import { useTilt } from "@/hooks/use-tilt";
import { useToast } from "@/components/ui/use-toast";

const projects: Project[] = [
  {
    title: "Early Resume Project — Portfolio v1",
    description: "My very first personal website showcasing basic projects and blogs.",
    tech: ["React", "Tools"],
  },
  {
    title: "AI Chatbot Assistant",
    description: "Conversational assistant powered by transformer models for FAQs.",
    tech: ["AI", "React", "Tools"],
  },
  {
    title: "Realtime Dashboard",
    description: "Streaming metrics dashboard with websockets and charts.",
    tech: ["React", "Tools"],
  },
  {
    title: "Latest Build — Vision Pipeline",
    description: "Image processing pipeline with GPU acceleration and async workers.",
    tech: ["AI", "Tools"],
  },
];

const skillsMap = {
  Programming: ["TypeScript", "Python", "Go"],
  Frameworks: ["React", "Node.js", "Tailwind"],
  Tools: ["Docker", "Git", "PostgreSQL"],
  "Soft Skills": ["Leadership", "Communication", "Problem Solving"],
};

const allSkills: string[] = Object.values(skillsMap).flat();

const skillIcon = (name: string) => {
  const base = "opacity-80";
  if (name === "TypeScript" || name === "React" || name === "Node.js") return <MessageSquareCode className={base} />;
  if (name === "Python" || name === "Go") return <Cpu className={base} />;
  if (name === "Tailwind" || name === "Docker" || name === "Git" || name === "PostgreSQL") return <Layers className={base} />;
  return <BadgeCheck className={base} />;
};

const milestones = [
  { year: "10th Class", text: "Year of 10th — tap for details" },
  { year: "12th Class", text: "Year of 12th — tap for details" },
  { year: "BCA (Bachelor’s)", text: "Duration: 3 years" },
  { year: "MCA (AI)", text: "Duration: 2 years" },
  { year: "Company A", text: "Role — Duration" },
  { year: "Company B", text: "Role — Duration" },
];

const Index = () => {
  setPageSEO({ title: "Home", description: "Piyush’s Relm — Building AI solutions & futuristic ideas." });

  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);

  // Journey scroll animation
  const journeyRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: journeyRef, offset: ["start center", "end center"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "calc(100% - 2rem)"]);

  const visibleProjects = showAllProjects ? projects : projects.slice(0, 3);
  const visibleSkills = showAllSkills ? allSkills : allSkills.slice(0, 9);

  return (
    <main className="min-h-screen relative">
      <GlassBackground />

      {/* Hero */}
      <section className="container mx-auto px-4 pt-28 pb-20 text-center">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-widest">Piyush</h1>
          <p className="mt-4 text-lg text-muted-foreground">Building AI solutions & futuristic ideas</p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <a href="#projects">
              <Button variant="hero" size="xl" className="rounded-full">Projects <Rocket /></Button>
            </a>
            <a href="#skills">
              <Button variant="glass" size="xl" className="rounded-full">Skills <Layers /></Button>
            </a>
            <a href="#journey">
              <Button variant="glass" size="xl" className="rounded-full">Journey <Bike /></Button>
            </a>
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="container mx-auto px-4 pb-20">
        <header className="mb-6 text-center">
          <h2 className="font-display text-2xl tracking-wider">Projects</h2>
          <p className="text-muted-foreground mt-2">Interactive glass cards with neon accents</p>
        </header>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <Button variant="glass" className="rounded-full" onClick={() => setShowAllProjects((v) => !v)}>
            {showAllProjects ? "View less" : "View more"}
          </Button>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="container mx-auto px-4 pb-20">
        <header className="mb-6 text-center">
          <h2 className="font-display text-2xl tracking-wider">Skills</h2>
          <p className="text-muted-foreground mt-2">Three per row, expand for more</p>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleSkills.map((s) => (
            <div key={s} className="glass rounded-xl p-5 text-center">
              <span className="inline-flex items-center gap-2">
                {skillIcon(s)}
                <span>{s}</span>
              </span>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <Button variant="glass" className="rounded-full" onClick={() => setShowAllSkills((v) => !v)}>
            {showAllSkills ? "View less" : "View more"}
          </Button>
        </div>
      </section>

      {/* Journey Section */}
      <section id="journey" className="container mx-auto px-4 pb-24">
        <header className="mb-6 text-center">
          <h2 className="font-display text-2xl tracking-wider">My Journey</h2>
          <p className="text-muted-foreground mt-2">Scroll to ride along the neon road</p>
        </header>

        <div ref={journeyRef} className="relative glass rounded-xl p-6 overflow-hidden">
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
          <div className="mt-6 grid grid-cols-1 md:grid-cols-7 gap-4">
            {milestones.map((m) => (
              <motion.article
                key={m.year}
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass rounded-lg p-4 text-center animate-float"
              >
                <h3 className="font-medium tracking-wide">{m.year}</h3>
                <p className="text-sm text-muted-foreground mt-1">{m.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-4 pb-24">
        <header className="mb-6 text-center">
          <h2 className="font-display text-2xl tracking-wider">Contact Me</h2>
          <p className="text-muted-foreground mt-2">Send me a message via email</p>
        </header>
        <ContactForm />
      </section>
    </main>
  );
};

const ContactForm = () => {
  const toEmail = "hello@piyush.dev";
  const [cc, setCc] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const onSend = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:${toEmail}?subject=${encodeURIComponent(subject)}${cc ? `&cc=${encodeURIComponent(cc)}` : ""}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  return (
    <form onSubmit={onSend} className="mx-auto max-w-2xl glass rounded-xl p-6 space-y-4">
      <div>
        <label className="block text-sm mb-2">To</label>
        <input value={toEmail} readOnly className="w-full rounded-md bg-background border border-[hsl(var(--border))] px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm mb-2">CC</label>
        <input value={cc} onChange={(e) => setCc(e.target.value)} placeholder="Add CC (comma separated)" className="w-full rounded-md bg-background border border-[hsl(var(--border))] px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm mb-2">Subject</label>
        <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" className="w-full rounded-md bg-background border border-[hsl(var(--border))] px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm mb-2">Body</label>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write your message..." className="w-full min-h-40 rounded-md bg-background border border-[hsl(var(--border))] px-3 py-2" />
      </div>
      <div className="pt-2 flex justify-end">
        <Button type="submit" variant="glass" className="rounded-full">Send</Button>
      </div>
    </form>
  );
};

export default Index;
