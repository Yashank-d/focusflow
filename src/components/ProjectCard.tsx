import { ProjectWithClient } from "@/types";
import React from "react";

interface ProjectCardProps {
  project: ProjectWithClient;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-gray-200 w-[400px]">
      <h3 className="text-xl font-bold mb-2 text-gray-900">{project.title}</h3>
      <p className="text-gray-600 mb-4">Client: {project.client.name}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
          {project.status}
        </span>
        <span className="text-lg font-bold text-gray-800">
          ₹{project.invoiceAmount}
        </span>
      </div>
    </div>
  );
}
