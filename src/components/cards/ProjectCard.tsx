import { Button } from "@/components/ui/button";
import { ArrowUpRight, Code2, Cpu, Rocket, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { useTilt } from "@/hooks/use-tilt";

export type Project = {
  title: string;
  description: string;
  tech: string[];
  href?: string;
};

const techIconMap: Record<string, JSX.Element> = {
  React: <Code2 className="opacity-80" />,
  AI: <Cpu className="opacity-80" />,
  Tools: <Wrench className="opacity-80" />,
};

export const ProjectCard = ({ project }: { project: Project }) => {
  const tilt = useTilt({ maxTilt: 8, scale: 1.02 });
  return (
    <article
      className="group relative glass glass-hover rounded-xl p-5 transition-all"
      ref={tilt.ref as any}
      style={tilt.style}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative">
        <h3 className="font-medium text-lg tracking-wide">{project.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="skill-pill">{techIconMap[t] ?? <Rocket className="opacity-80" />}<span>{t}</span></span>
          ))}
        </div>
        <div className="mt-5">
          {project.href ? (
            <a href={project.href} target="_blank" rel="noreferrer">
              <Button variant="glass" size="sm" className="rounded-full">View Project <ArrowUpRight /></Button>
            </a>
          ) : (
            <Link to="#" aria-disabled>
              <Button variant="glass" size="sm" className="rounded-full">View Project <ArrowUpRight /></Button>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};
