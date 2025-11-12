import { getProjectsWithClients } from "@/lib/project-service";
import ProjectCard from "@/components/ProjectCard";
import { ProjectWithClient } from "@/types";
import CreateClientModal from "@/components/CreateClientModal";
import CreateProjectModal from "@/components/CreateProjectModal";

export default async function DashboardPage() {
  const projects: ProjectWithClient[] = await getProjectsWithClients();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Photographers Dashboard</h1>
        <CreateClientModal />
        <CreateProjectModal />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
