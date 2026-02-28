interface ClientAvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

// 8 distinct, accessible dark-theme colours
const PALETTE = [
  "bg-indigo-500/25 text-indigo-300 border-indigo-500/30",
  "bg-violet-500/25 text-violet-300 border-violet-500/30",
  "bg-sky-500/25    text-sky-300    border-sky-500/30",
  "bg-teal-500/25   text-teal-300   border-teal-500/30",
  "bg-emerald-500/25 text-emerald-300 border-emerald-500/30",
  "bg-amber-500/25  text-amber-300  border-amber-500/30",
  "bg-rose-500/25   text-rose-300   border-rose-500/30",
  "bg-pink-500/25   text-pink-300   border-pink-500/30",
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getColour(name: string): string {
  // Simple djb2-style hash for determinism
  let hash = 5381;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 33) ^ name.charCodeAt(i);
  }
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

const sizeMap = {
  sm: { wrapper: "w-8  h-8", text: "text-[11px]" },
  md: { wrapper: "w-10 h-10", text: "text-sm" },
  lg: { wrapper: "w-12 h-12", text: "text-base" },
};

export default function ClientAvatar({
  name,
  size = "md",
  className = "",
}: ClientAvatarProps) {
  const initials = getInitials(name);
  const colour = getColour(name);
  const s = sizeMap[size];

  return (
    <div
      className={`
        ${s.wrapper} rounded-full shrink-0
        flex items-center justify-center
        border font-semibold tracking-wide
        ${colour} ${className}
      `}
    >
      <span className={s.text}>{initials}</span>
    </div>
  );
}
