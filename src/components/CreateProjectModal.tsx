"use client";
import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Client } from "@/types";

export default function CreateProjectModal() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [invoiceAmount, setInvoiceAmount] = useState("");
  const [clientId, setClientId] = useState("");

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
      const respnse = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          invoiceAmount: parseInt(invoiceAmount, 10) || 0,
          clientId: clientId,
        }),
      });
      if (!respnse.ok) {
        const errorData = await respnse.json();
        throw new Error(errorData.message || "Failed to create project");
      }
      setIsOpen(false);
      resetForm();
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

  const resetForm = () => {
    setTitle("");
    setInvoiceAmount("");
    setClientId("");
    setError(null);
    setIsLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition-colors"
      >
        + Add New Project
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md z-50">
            <h2 className="text-2xl font-bold mb-4">Create a New Project</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
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
                    Select a client
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
                  placeholder="e.g., Smith Wedding"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
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
                  placeholder="e.g., 50000"
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
                  onClick={() => {
                    setIsOpen(false);
                    resetForm();
                  }}
                  className="text-gray-600 font-medium px-4 py-2 rounded-lg hover:bg-gray-100"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-green-700 disabled:bg-gray-400"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating..." : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
