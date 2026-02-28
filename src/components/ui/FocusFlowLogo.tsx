interface FocusFlowLogoProps {
  /** Show the wordmark ("FocusFlow") next to the icon. Default: true */
  showText?: boolean;
  /** Show the "Studio Manager" subtitle. Default: false */
  showSubtitle?: boolean;
  /** Size variant. Default: "md" */
  size?: "sm" | "md" | "lg";
  /** Extra className for the wrapper div */
  className?: string;
}

const sizeMap = {
  sm: {
    icon: "w-7 h-7",
    text: "text-sm",
    subtitle: "text-[9px]",
    letter: "text-base",
  },
  md: {
    icon: "w-8 h-8",
    text: "text-base",
    subtitle: "text-[10px]",
    letter: "text-lg",
  },
  lg: {
    icon: "w-10 h-10",
    text: "text-xl",
    subtitle: "text-[11px]",
    letter: "text-xl",
  },
};

export default function FocusFlowLogo({
  showText = true,
  showSubtitle = false,
  size = "md",
  className = "",
}: FocusFlowLogoProps) {
  const s = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* ── Icon mark ─────────────────────────────────────────────────── */}
      <div
        className={`
          ${s.icon} rounded-lg shrink-0
          bg-linear-to-br from-blue-600 to-indigo-600
          flex items-center justify-center
          shadow-[0_0_18px_rgba(79,70,229,0.35)]
          border border-white/10
        `}
      >
        <span className={`font-serif text-white font-bold ${s.letter}`}>F</span>
      </div>

      {/* ── Wordmark ──────────────────────────────────────────────────── */}
      {showText && (
        <div className="min-w-0">
          <p
            className={`font-serif text-white tracking-wide leading-none ${s.text}`}
          >
            FocusFlow
          </p>
          {showSubtitle && (
            <p
              className={`text-gray-500 uppercase tracking-widest font-medium mt-0.5 ${s.subtitle}`}
            >
              Studio Manager
            </p>
          )}
        </div>
      )}
    </div>
  );
}
