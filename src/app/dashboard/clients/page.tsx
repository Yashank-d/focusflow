import { getClients } from "@/lib/client-service";
import ClientCard from "@/components/ClientCard";
import CreateClientModal from "@/components/CreateClientModal";
import PageHeader from "@/components/ui/PageHeader";
import StatsBar from "@/components/ui/StatsBar";
import { Client } from "@/types";
import { Users } from "lucide-react";

type ClientWithCount = Client & {
  _count: { projects: number };
};

export default async function ClientsPage() {
  const clients = (await getClients()) as ClientWithCount[];

  // ── Compute stats server-side ────────────────────────────────────────────
  const activeClients = clients.filter((c) => c._count.projects > 0).length;
  const totalProjects = clients.reduce((sum, c) => sum + c._count.projects, 0);
  const noProjectClients = clients.filter(
    (c) => c._count.projects === 0,
  ).length;

  const stats = [
    {
      label: "Total Clients",
      value: clients.length,
      accent: "default" as const,
    },
    {
      label: "Active Clients",
      value: activeClients,
      sub: "have projects",
      accent: "green" as const,
    },
    {
      label: "Total Projects",
      value: totalProjects,
      sub: "across all clients",
      accent: "blue" as const,
    },
    {
      label: "No Projects",
      value: noProjectClients,
      sub: noProjectClients === 1 ? "client" : "clients",
      accent: "amber" as const,
    },
  ];

  return (
    <div className="space-y-6">
      {/* ── Page header ──────────────────────────────────────────────── */}
      <PageHeader
        title="My Clients"
        subtitle="Manage your client relationships and contact details."
      >
        <CreateClientModal />
      </PageHeader>

      {/* ── Stats bar ────────────────────────────────────────────────── */}
      {clients.length > 0 && <StatsBar stats={stats} />}

      {/* ── Cards grid ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.length > 0 ? (
          clients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))
        ) : (
          /* ── Empty state ──────────────────────────────────────────── */
          <div className="col-span-full py-24 flex flex-col items-center justify-center text-center border border-dashed border-white/10 rounded-2xl">
            <div className="w-16 h-16 mb-5 rounded-2xl bg-white/4 border border-white/[0.07] flex items-center justify-center">
              <Users className="text-gray-600" size={28} />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">
              No clients yet
            </h3>
            <p className="text-sm text-gray-500 max-w-xs mx-auto mb-6 leading-relaxed">
              Add your first client to start tracking projects and invoices.
              Clients are linked to projects automatically.
            </p>
            <CreateClientModal />
          </div>
        )}
      </div>
    </div>
  );
}
