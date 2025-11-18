import { getClients } from "@/lib/client-service";
import ClientCard from "@/components/ClientCard";
import CreateClientModal from "@/components/CreateClientModal";
import { Client } from "@/types";

export default async function ClientsPage() {
  type ClientWithCount = Client & {
    _count: {
      projects: number;
    };
  };
  const clients = (await getClients()) as ClientWithCount[];
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Clients</h1>
        <CreateClientModal />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>

      {clients.length === 0 && (
        <div className="text-center text-gray-500 mt-12">
          <p>You haven&#39;t added any clients yet.</p>
          <p>Click &#34;+ Add New Client&#34; to get started.</p>
        </div>
      )}
    </div>
  );
}
