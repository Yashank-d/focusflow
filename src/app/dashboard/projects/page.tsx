import { getProjectsWithClients } from "@/lib/project-service";
import ProjectCard from "@/components/ProjectCard";
import { ProjectWithClient } from "@/types";
import CreateClientModal from "@/components/CreateClientModal";
import CreateProjectModal from "@/components/CreateProjectModal";
import PageHeader from "@/components/ui/PageHeader"; // Ensure you created this from my previous message

export default async function DashboardPage() {
  const projects: ProjectWithClient[] = await getProjectsWithClients();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Projects"
        subtitle="Manage active shoots, editing queues, and payments."
      >
        <div className="flex items-center gap-3" id="action-buttons">
          <div id="btn-create-client">
            <CreateClientModal />
          </div>
          <div id="btn-create-project">
            <CreateProjectModal />
          </div>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <div key={project.id} id={index === 0 ? "first-project-card" : undefined} className="h-full">
               <ProjectCard project={project} />
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-2xl">
            <p className="text-gray-400">
              No projects found. Create your first one!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
