import { getProjectsWithClients } from "@/lib/project-service";
import ProjectCard from "@/components/ProjectCard";
import { ProjectWithClient } from "@/types";
import CreateClientModal from "@/components/CreateClientModal";
import CreateProjectModal from "@/components/CreateProjectModal";
import PageHeader from "@/components/ui/PageHeader";
import StatsBar from "@/components/ui/StatsBar";
import { FolderOpen } from "lucide-react";

export default async function DashboardPage() {
  const projects: ProjectWithClient[] = await getProjectsWithClients();

  // ── Compute stats server-side (zero extra DB calls) ─────────────────────
  const totalRevenue = projects.reduce((sum, p) => sum + p.invoiceAmount, 0);
  const paidCount = projects.filter(
    (p) => p.status.toLowerCase() === "paid",
  ).length;
  const pendingCount = projects.filter(
    (p) => !["paid", "completed"].includes(p.status.toLowerCase()),
  ).length;

  const stats = [
    {
      label: "Total Projects",
      value: projects.length,
      accent: "default" as const,
    },
    {
      label: "Paid",
      value: paidCount,
      sub: paidCount === 1 ? "project" : "projects",
      accent: "green" as const,
    },
    {
      label: "In Progress",
      value: pendingCount,
      sub: pendingCount === 1 ? "project" : "projects",
      accent: "amber" as const,
    },
    {
      label: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      accent: "purple" as const,
    },
  ];

  return (
    <div className="space-y-6">
      {/* ── Page header ──────────────────────────────────────────────── */}
      <PageHeader
        title="Projects"
        subtitle="Manage active shoots, editing queues, and payments."
      >
        <div className="flex items-center gap-3">
          <CreateClientModal />
          <CreateProjectModal />
        </div>
      </PageHeader>

      {/* ── Stats bar — only shown when there are projects ───────────── */}
      {projects.length > 0 && <StatsBar stats={stats} />}

      {/* ── Cards grid ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          /* ── Improved empty state ─────────────────────────────────── */
          <div className="col-span-full py-24 flex flex-col items-center justify-center text-center border border-dashed border-white/10 rounded-2xl">
            <div className="w-16 h-16 mb-5 rounded-2xl bg-white/4 border border-white/[0.07] flex items-center justify-center">
              <FolderOpen className="text-gray-600" size={28} />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">
              No projects yet
            </h3>
            <p className="text-sm text-gray-500 max-w-xs mx-auto mb-6 leading-relaxed">
              Create your first project to start tracking shoots, sending sneak
              peeks, and collecting payments.
            </p>
            <CreateProjectModal />
          </div>
        )}
      </div>
    </div>
  );
}
