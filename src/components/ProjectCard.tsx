import { ProjectWithClient } from "@/types";
import DeleteProjectButton from "./DeleteProjectButton";
import EditProjectModal from "./EditProjectModal";
import CopyLinkButton from "./CopyLinkButton";
import GlassCard from "@/components/ui/GlassCard";
import { User } from "lucide-react";

interface ProjectCardProps {
  project: ProjectWithClient;
}

// ─── Status config ────────────────────────────────────────────────────────────
// Each status gets: badge colours + a left-border accent on the card
const STATUS_CONFIG: Record<
  string,
  { badge: string; border: string; dot: string }
> = {
  booked: {
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    border: "border-l-blue-500/60",
    dot: "bg-blue-400",
  },
  editing: {
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    border: "border-l-amber-500/60",
    dot: "bg-amber-400",
  },
  finals_ready: {
    badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    border: "border-l-purple-500/60",
    dot: "bg-purple-400",
  },
  paid: {
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    border: "border-l-emerald-500/60",
    dot: "bg-emerald-400",
  },
  completed: {
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    border: "border-l-emerald-500/60",
    dot: "bg-emerald-400",
  },
  pending: {
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    border: "border-l-amber-500/60",
    dot: "bg-amber-400",
  },
};

const DEFAULT_CONFIG = {
  badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  border: "border-l-blue-500/60",
  dot: "bg-blue-400",
};

function getStatusConfig(status: string) {
  return STATUS_CONFIG[status.toLowerCase()] ?? DEFAULT_CONFIG;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function ProjectCard({ project }: ProjectCardProps) {
  const cfg = getStatusConfig(project.status);

  return (
    <GlassCard
      className={`
        flex flex-col h-full p-6
        border-l-2 ${cfg.border}
        transition-all duration-200
      `}
      hoverEffect={true}
    >
      <div className="grow space-y-4">
        {/* ── Header: Title & Price ───────────────────────────────────── */}
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-xl font-serif font-medium text-white tracking-wide truncate">
            {project.title}
          </h3>
          <span className="font-mono text-base font-bold text-white/80 tracking-tight shrink-0">
            ₹{project.invoiceAmount.toLocaleString()}
          </span>
        </div>

        {/* ── Client row ─────────────────────────────────────────────── */}
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <User size={14} className="shrink-0" />
          <span className="truncate">
            {project.client?.name ?? "No Client"}
          </span>
        </div>

        {/* ── Status badge ───────────────────────────────────────────── */}
        <div className="pt-1">
          <span
            className={`
              inline-flex items-center gap-1.5
              px-3 py-1 rounded-full
              text-xs font-semibold tracking-wider uppercase border
              ${cfg.badge}
            `}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
            {project.status}
          </span>
        </div>
      </div>

      {/* ── Divider ────────────────────────────────────────────────────── */}
      <div className="h-px w-full bg-white/[0.07] my-5" />

      {/* ── Actions footer ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <CopyLinkButton projectId={project.id} />
        {/* Spacer between copy and destructive actions */}
        <div className="flex items-center gap-3">
          <EditProjectModal project={project} />
          <DeleteProjectButton projectId={project.id} />
        </div>
      </div>
    </GlassCard>
  );
}
