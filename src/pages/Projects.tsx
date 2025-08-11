import { ProjectCard, type Project } from "@/components/cards/ProjectCard";
import GlassBackground from "@/components/visual/GlassBackground";
import { setPageSEO } from "@/lib/seo";

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

const Projects = () => {
  setPageSEO({ title: "Projects", description: "Explore Piyush’s projects from early work to the latest builds." });
  return (
    <main className="min-h-screen relative">
      <GlassBackground />
      <section className="container mx-auto px-4 pt-28 pb-20">
        <header className="mb-6">
          <h1 className="font-display text-3xl tracking-wider">Projects</h1>
          <p className="text-muted-foreground mt-2">Interactive glass cards with neon accents</p>
        </header>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Projects;
