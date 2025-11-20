"use client";
import { useState, FormEvent, useEffect } from "react";
import { createPortal } from "react-dom"; 
import { useRouter } from "next/navigation";
import { Client } from "@/types";
import { X } from "lucide-react";
import GradientButton from "@/components/ui/GradientButton";
import GlassInput from "@/components/ui/GlassInput";

export default function CreateProjectModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false); 
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [invoiceAmount, setInvoiceAmount] = useState("");
  const [clientId, setClientId] = useState("");
  const [clients, setClients] = useState<Client[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true); 
    if (isOpen) {
      const fetchClients = async () => {
        try {
          const res = await fetch("/api/clients");
          if (!res.ok) throw new Error("Failed to fetch clients");
          const data: Client[] = await res.json();
          setClients(data);
          if (data.length > 0) setClientId(data[0].id);
        } catch (err) {
          if (err instanceof Error)
            setError("Could not load clients. " + err.message);
        }
      };
      fetchClients();
    }
  }, [isOpen]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const payloadClientId = clientId === "" ? null : clientId;

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          invoiceAmount: parseInt(invoiceAmount, 10) || 0,
          clientId: payloadClientId,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create project");
      }
      setIsOpen(false);
      resetForm();
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setInvoiceAmount("");
    setClientId(clients.length > 0 ? clients[0].id : "");
    setError(null);
    setIsLoading(false);
  };


  const modalContent = (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal Container */}
      <div className="bg-[#0f172a] border border-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden z-10">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-white/20 to-transparent"></div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif text-white">Create Project</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5 ml-1">
              Assign to Client
            </label>
            <select
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30 appearance-none"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              required
            >
              <option value="" disabled className="bg-slate-900 text-gray-500">
                Select a client...
              </option>
              {clients.map((client) => (
                <option
                  key={client.id}
                  value={client.id}
                  className="bg-slate-900 text-white"
                >
                  {client.name}
                </option>
              ))}
            </select>
          </div>

          <GlassInput
            label="Project Title"
            id="title"
            placeholder="e.g., Smith Wedding"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <GlassInput
            label="Invoice Amount (₹)"
            id="amount"
            type="number"
            placeholder="50000"
            value={invoiceAmount}
            onChange={(e) => setInvoiceAmount(e.target.value)}
            required
          />

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200 text-sm">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <GradientButton
              type="button"
              variant="secondary"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </GradientButton>
            <GradientButton type="submit" isLoading={isLoading}>
              Create Project
            </GradientButton>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <>
      <GradientButton onClick={() => setIsOpen(true)}>
        + New Project
      </GradientButton>

      {/* TELEPORT THE MODAL OUT */}
      {isOpen && mounted && createPortal(modalContent, document.body)}
    </>
  );
}
