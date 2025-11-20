import DeleteClientButton from "./DeleteClientButton";
import EditClientModal from "./EditClientModal";
import { Client } from "@/types";
import GlassCard from "@/components/ui/GlassCard";
import { Mail, FolderOpen, User } from "lucide-react";

interface ClientCardProps {
  client: Client & {
    _count: {
      projects: number;
    };
  };
}

export default function ClientCard({ client }: ClientCardProps) {
  const projectCount = client._count.projects;

  return (
    <GlassCard className="flex flex-col h-full p-6" hoverEffect={true}>
      <div className="grow space-y-4">

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-white/10 text-white">
            <User size={18} />
          </div>
          <div>
            <h3 className="text-lg font-serif font-medium text-white tracking-wide">
              {client.name || "N/A"}
            </h3>
            {/* Email Row */}
            <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
              <Mail size={12} />
              <span>{client.email || "No email provided"}</span>
            </div>
          </div>
        </div>


        <div className="pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
            <FolderOpen size={14} className="text-purple-300" />
            <span className="text-sm text-gray-300">
              {projectCount}{" "}
              <span className="text-gray-500 text-xs uppercase tracking-wider ml-1">
                Projects
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-white/10 my-5" />

      <div className="flex justify-end items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
        <EditClientModal client={client} />
        <DeleteClientButton clientId={client.id} />
      </div>
    </GlassCard>
  );
}
