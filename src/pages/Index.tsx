
import { Button } from "@/components/ui/button";
import { motion, useMotionValue, animate, useScroll, useTransform } from "framer-motion";
import { setPageSEO } from "@/lib/seo";
import { BadgeCheck, Cpu, Layers, MessageSquareCode, Rocket, Bike } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ProjectCard, type Project } from "@/components/cards/ProjectCard";
import { SkillCard } from "@/components/cards/SkillCard";

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

  // Journey drag animation
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

  const visibleProjects = showAllProjects ? projects : projects.slice(0, 3);
  const visibleSkills = showAllSkills ? allSkills : allSkills.slice(0, 9);

  return (
    <main className="min-h-screen relative">
      

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
        <div className="glass rounded-xl p-6">
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
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="container mx-auto px-4 pb-20">
        <div className="glass rounded-xl p-6">
          <header className="mb-6 text-center">
            <h2 className="font-display text-2xl tracking-wider">Skills</h2>
            <p className="text-muted-foreground mt-2">Three per row, expand for more</p>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleSkills.map((s) => (
              <SkillCard key={s} name={s} icon={skillIcon(s)} />
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <Button variant="glass" className="rounded-full" onClick={() => setShowAllSkills((v) => !v)}>
              {showAllSkills ? "View less" : "View more"}
            </Button>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section id="journey" className="container mx-auto px-4 pb-24">
        <header className="mb-6 text-center">
          <h2 className="font-display text-2xl tracking-wider">My Journey</h2>
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
          <div className="mt-6 grid grid-cols-1 md:grid-cols-7 gap-4">
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

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-4 pb-24">
        <div className="glass rounded-xl p-6">
          <header className="mb-6 text-center">
            <h2 className="font-display text-2xl tracking-wider">Contact Me</h2>
            <p className="text-muted-foreground mt-2">Send me a message via email</p>
          </header>
          <ContactForm />
        </div>
      </section>
    </main>
  );
};

const ContactForm = () => {
  const toEmail = "sharmapiyush1106@gmail.com";
  const { toast } = useToast();
  const [from, setFrom] = useState("");
  const [cc, setCc] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const onSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!from || !subject || !body) {
      toast({ title: "Missing required fields", description: "From, Subject and Body are required.", variant: "destructive" as any });
      return;
    }
    // TODO: Replace with secure backend email (Supabase Edge Function + Resend)
    const parts = [
      `subject=${encodeURIComponent(subject)}`,
      cc ? `cc=${encodeURIComponent(cc)}` : "",
      `body=${encodeURIComponent(`From: ${from}\n\n${body}`)}`,
    ].filter(Boolean);
    window.location.href = `mailto:${toEmail}?${parts.join("&")}`;
  };

  return (
    <form onSubmit={onSend} className="mx-auto max-w-2xl glass rounded-xl p-6 space-y-4">
      <div>
        <label className="block text-sm mb-2">To</label>
        <input value={toEmail} readOnly className="w-full rounded-md bg-background border border-[hsl(var(--border))] px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm mb-2">From<span className="ml-1 text-[hsl(var(--destructive))]">*</span></label>
        <input value={from} onChange={(e) => setFrom(e.target.value)} type="email" required placeholder="your@email.com" className="w-full rounded-md bg-background border border-[hsl(var(--border))] px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm mb-2">CC</label>
        <input value={cc} onChange={(e) => setCc(e.target.value)} placeholder="Add CC (comma separated)" className="w-full rounded-md bg-background border border-[hsl(var(--border))] px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm mb-2">Subject<span className="ml-1 text-[hsl(var(--destructive))]">*</span></label>
        <input value={subject} onChange={(e) => setSubject(e.target.value)} required placeholder="Subject" className="w-full rounded-md bg-background border border-[hsl(var(--border))] px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm mb-2">Body<span className="ml-1 text-[hsl(var(--destructive))]">*</span></label>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} required placeholder="Write your message..." className="w-full min-h-40 rounded-md bg-background border border-[hsl(var(--border))] px-3 py-2" />
      </div>
      <div className="pt-2 flex justify-end">
        <Button type="submit" variant="glass" className="rounded-full">Send</Button>
      </div>
    </form>
  );
};

export default Index;
