import DeleteClientButton from "./DeleteClientButton";
import EditClientModal from "./EditClientModal";
import { Client } from "@/types";

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
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 flex flex-col">
      <div className="grow">
        <h3 className="text-xl font-bold mb-22 text-gray-900">
          {client.name || "N/A"}
        </h3>
        <p className="text-gray-600 mb-4">
          {client.email || "No email provided"}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py01 rounded-full">
            {projectCount} {projectCount === 1 ? "Project" : "Projects"}
          </span>
        </div>
      </div>
      <div className="border-t border-gray-100 pt-4 mt-4 flex justify-end gap-4">
        <EditClientModal client={client} />
        <DeleteClientButton clientId={client.id} />
      </div>
    </div>
  );
}
