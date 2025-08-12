import { cn } from "@/lib/utils";

const GlassBackground = ({ className = "" }: { className?: string }) => {
  return (
    <div aria-hidden className={cn("pointer-events-none fixed inset-0 -z-10 overflow-hidden", className)}>
      {/* Animated neon orbs on pure black background */}
      <div className="orb orb--blue" style={{ top: "-10%", left: "-10%" }} />
      <div className="orb orb--red" style={{ top: "20%", right: "-12%", animationDelay: "2s" }} />
      <div className="orb orb--green" style={{ bottom: "-12%", left: "28%", animationDelay: "4s" }} />
      <div className="orb orb--yellow" style={{ top: "60%", right: "18%", animationDelay: "6s" }} />
    </div>
  );
};

export default GlassBackground;
