import { ProjectWithClient } from "@/types";
import DeleteProjectButton from "./DeleteProjectButton";
import React from "react";
import EditProjectModal from "./EditProjectModal";

interface ProjectCardProps {
  project: ProjectWithClient;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 flex flex-col">
      <div className="grow">
        <h3 className="text-xl font-bold mb-2 text-gray-900">
          {project.title}
        </h3>
        <p className="text-gray-600 mb-4">
          Client: {project.client?.name || "N/A"}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
            {project.status}
          </span>
          <span className="text-lg font-bold text-gray-800">
            ₹{project.invoiceAmount}
          </span>
        </div>
      </div>
      <div className="border-t border-gray-100 pt-4 mt-4 flex justify-end gap-4">
        <EditProjectModal project={project} />
        <DeleteProjectButton projectId={project.id} />
      </div>
    </div>
  );
}
