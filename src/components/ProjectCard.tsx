import { ProjectWithClient } from "@/types";
import DeleteProjectButton from "./DeleteProjectButton";
import EditProjectModal from "./EditProjectModal";
import CopyLinkButton from "./CopyLinkButton";
import GlassCard from "@/components/ui/GlassCard";
import { User } from "lucide-react"; 
interface ProjectCardProps {
  project: ProjectWithClient;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    const s = status.toLowerCase();
    if (s === "paid" || s === "completed")
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    if (s === "pending")
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    return "bg-blue-500/10 text-blue-400 border-blue-500/20";
  };

  return (
    <GlassCard className="flex flex-col h-full p-6" hoverEffect={true}>
      <div className="grow space-y-4">
        {/* Header: Title & Price */}
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-xl font-serif font-medium text-white tracking-wide truncate">
            {project.title}
          </h3>
          <span className="font-mono text-lg font-bold text-white/90 tracking-tight">
            ₹{project.invoiceAmount.toLocaleString()}
          </span>
        </div>

        {/* Meta Details */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <User size={14} />
            <span>{project.client?.name || "No Client"}</span>
          </div>

          {/* Optional: If you have a date field, you can add it here later */}
          {/* <div className="flex items-center gap-2 text-sm text-gray-400">
            <Calendar size={14} />
            <span>Oct 24, 2025</span>
          </div> */}
        </div>

        {/* Status Badge */}
        <div className="pt-2">
          <span
            className={`
            inline-flex items-center px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase border
            ${getStatusColor(project.status)}
          `}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current mr-2 opacity-60"></span>
            {project.status}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-white/10 my-5" />

      {/* Actions Footer */}
      <div className="flex items-center justify-between opacity-80 hover:opacity-100 transition-opacity">
        <CopyLinkButton projectId={project.id} />

        <div className="flex items-center gap-2">
          <EditProjectModal project={project} />
          <DeleteProjectButton projectId={project.id} />
        </div>
      </div>
    </GlassCard>
  );
}
