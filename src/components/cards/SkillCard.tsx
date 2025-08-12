import { useTilt } from "@/hooks/use-tilt";

export const SkillCard = ({ name, icon }: { name: string; icon: JSX.Element }) => {
  const tilt = useTilt({ maxTilt: 6, scale: 1.03 });
  return (
    <article
      className="group relative glass glass-hover rounded-xl p-5 text-center transition-all"
      ref={tilt.ref as any}
      style={tilt.style}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-secondary/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="relative inline-flex items-center gap-2">
        {icon}
        <span>{name}</span>
      </span>
    </article>
  );
};
