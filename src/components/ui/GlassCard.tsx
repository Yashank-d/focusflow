interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  hoverEffect = false,
}: GlassCardProps) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md
        transition-all duration-300 group
        ${
          hoverEffect
            ? "hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
            : ""
        }
        ${className}
      `}
    >
      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
