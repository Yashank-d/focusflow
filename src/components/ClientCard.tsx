import DeleteClientButton from "./DeleteClientButton";
import EditClientModal from "./EditClientModal";
import { Client } from "@/types";
import GlassCard from "@/components/ui/GlassCard";
import ClientAvatar from "@/components/ui/ClientAvatar"; // ← new initials avatar
import { Mail, FolderOpen } from "lucide-react";

interface ClientCardProps {
  client: Client & {
    _count: { projects: number };
  };
}

export default function ClientCard({ client }: ClientCardProps) {
  const projectCount = client._count.projects;

  return (
    <GlassCard
      className="flex flex-col h-full p-6 border-l-2 border-l-indigo-500/40"
      hoverEffect={true}
    >
      <div className="grow space-y-4">
        {/* ── Header: avatar + name + email ──────────────────────────── */}
        <div className="flex items-start gap-4">
          <ClientAvatar name={client.name ?? "?"} size="md" />
          <div className="min-w-0">
            <h3 className="text-lg font-serif font-medium text-white tracking-wide truncate">
              {client.name ?? "N/A"}
            </h3>
            <div className="flex items-center gap-1.5 text-sm text-gray-400 mt-1 min-w-0">
              <Mail size={12} className="shrink-0" />
              <span className="truncate">
                {client.email ?? "No email provided"}
              </span>
            </div>
          </div>
        </div>

        {/* ── Project count badge ─────────────────────────────────────── */}
        <div className="pt-1">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
            <FolderOpen size={13} className="text-indigo-400 shrink-0" />
            <span className="text-sm text-gray-300">
              {projectCount}
              <span className="text-gray-500 text-xs uppercase tracking-wider ml-1.5">
                {projectCount === 1 ? "Project" : "Projects"}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* ── Divider ────────────────────────────────────────────────────── */}
      <div className="h-px w-full bg-white/[0.07] my-5" />

      {/* ── Actions ────────────────────────────────────────────────────── */}
      <div className="flex justify-end items-center gap-3">
        <EditClientModal client={client} />
        <DeleteClientButton clientId={client.id} />
      </div>
    </GlassCard>
  );
}
