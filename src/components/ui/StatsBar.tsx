interface Stat {
  label: string;
  value: string | number;
  sub?: string; // optional tiny secondary line e.g. "this month"
  accent?: "default" | "green" | "amber" | "blue" | "purple";
}

interface StatsBarProps {
  stats: Stat[];
}

const accentMap: Record<NonNullable<Stat["accent"]>, string> = {
  default: "text-white",
  green: "text-emerald-400",
  amber: "text-amber-400",
  blue: "text-blue-400",
  purple: "text-violet-400",
};

export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="
            rounded-2xl border border-white/[0.07]
            bg-white/3 hover:bg-white/5
            px-5 py-4 transition-colors
          "
        >
          <p className="text-[11px] text-gray-500 uppercase tracking-widest mb-1.5">
            {stat.label}
          </p>
          <p
            className={`text-2xl font-semibold leading-none ${
              accentMap[stat.accent ?? "default"]
            }`}
          >
            {stat.value}
          </p>
          {stat.sub && (
            <p className="text-[11px] text-gray-600 mt-1.5">{stat.sub}</p>
          )}
        </div>
      ))}
    </div>
  );
}
