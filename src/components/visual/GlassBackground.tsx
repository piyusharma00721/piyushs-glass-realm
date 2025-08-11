import { cn } from "@/lib/utils";

const GlassBackground = ({ className = "" }: { className?: string }) => {
  return (
    <div aria-hidden className={cn("pointer-events-none fixed inset-0 -z-10 overflow-hidden", className)}>
      {/* Soft gradient backdrop for depth */}
      <div className="absolute inset-0 opacity-35" style={{ backgroundImage: 'var(--gradient-hero)' }} />

      {/* Floating neon blobs */}
      <div className="absolute -top-24 -left-24 h-[38rem] w-[38rem] rounded-full blur-3xl animate-blob"
           style={{ background: "radial-gradient(closest-side, hsl(var(--primary)/0.12), transparent)" }} />
      <div className="absolute top-1/4 -right-40 h-[30rem] w-[30rem] rounded-full blur-3xl animate-blob"
           style={{ background: "radial-gradient(closest-side, hsl(var(--secondary)/0.10), transparent)", animationDelay: '2s' }} />
      <div className="absolute bottom-[-8rem] left-1/3 h-[26rem] w-[26rem] rounded-full blur-3xl animate-blob"
           style={{ background: "radial-gradient(closest-side, hsl(var(--accent)/0.08), transparent)", animationDelay: '4s' }} />

      {/* Subtle scanline shimmer */}
      <div className="absolute inset-0 opacity-[0.08]" style={{
        backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.09) 0px, rgba(255,255,255,0.09) 1px, transparent 1px, transparent 3px)"
      }} />
    </div>
  );
};

export default GlassBackground;
