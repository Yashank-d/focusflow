"use client";
import { useState, FormEvent, useEffect } from "react";
import { Client, ProjectWithClient } from "@/types";
import { useRouter } from "next/navigation";

interface EditProjectModalProps {
  project: ProjectWithClient;
}

export default function EditProjectModal({ project }: EditProjectModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const [title, setTitle] = useState(project.title);
  const [invoiceAmount, setInvoiceAmount] = useState(
    String(project.invoiceAmount)
  );
  const [clientId, setClientId] = useState(project.clientId);
  const [status, setStatus] = useState(project.status);

  const [clients, setClients] = useState<Client[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const fetchClients = async () => {
        try {
          const res = await fetch("/api/clients");
          if (!res.ok) throw new Error("Failed to fetch clients");
          const data: Client[] = await res.json();
          setClients(data);
        } catch (err) {
          if (err instanceof Error) {
            setError("Could not load clients. " + err.message);
          }
        }
      };
      fetchClients();
    }
  }, [isOpen]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/projects/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: project.id,
          title: title,
          invoiceAmount: parseInt(invoiceAmount, 10) || 0,
          clientId: clientId,
          status: status,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update project");
      }

      setIsOpen(false);
      router.refresh();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-sm text-gray-500 hover:text-gray-700"
      >
        Edit
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md z-50">
            <h2 className="text-2xl font-bold mb-4">Edit Project</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="client"
                >
                  Assign to Client
                </label>
                <select
                  id="client"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select a client...
                  </option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="title"
                >
                  Project Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="status"
                >
                  Status
                </label>
                <select
                  id="status"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                >
                  <option value="BOOKED">Booked</option>
                  <option value="EDITING">Editing</option>
                  <option value="REVIEW">In Review</option>
                  <option value="PAID">Paid</option>
                </select>
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="amount"
                >
                  Invoice Amount (in ₹)
                </label>
                <input
                  type="number"
                  id="amount"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={invoiceAmount}
                  onChange={(e) => setInvoiceAmount(e.target.value)}
                  required
                />
              </div>
              {error && (
                <div className="text-red-600 text-sm mb-4">Error: {error}</div>
              )}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-600 font-medium px-4 py-2 rounded-lg hover:bg-gray-100"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
