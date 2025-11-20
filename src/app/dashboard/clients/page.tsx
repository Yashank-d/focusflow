import { getClients } from "@/lib/client-service";
import ClientCard from "@/components/ClientCard";
import CreateClientModal from "@/components/CreateClientModal";
import PageHeader from "@/components/ui/PageHeader"; 
import { Client } from "@/types";
import { Users } from "lucide-react";

export default async function ClientsPage() {
  type ClientWithCount = Client & {
    _count: {
      projects: number;
    };
  };

  const clients = (await getClients()) as ClientWithCount[];

  return (
    <div className="space-y-8">
      <PageHeader
        title="My Clients"
        subtitle="Manage your client relationships and contact details."
      >
        <CreateClientModal />
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.length > 0 ? (
          clients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))
        ) : (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-center border border-dashed border-white/10 rounded-2xl bg-white/5">
            <div className="w-16 h-16 mb-4 rounded-full bg-white/5 flex items-center justify-center">
              <Users className="text-gray-500" size={32} />
            </div>
            <h3 className="text-lg font-medium text-white mb-1">
              No clients yet
            </h3>
            <p className="text-gray-400 mb-6 max-w-xs mx-auto">
              Add your first client to start tracking projects and invoices.
            </p>
            <CreateClientModal />
          </div>
        )}
      </div>
    </div>
  );
}
