"use client";
import { useState, FormEvent, useEffect } from "react";
import { createPortal } from "react-dom"; 
import { Client, ProjectWithClient } from "@/types";
import { useRouter } from "next/navigation";
import { Edit2, X } from "lucide-react";
import GradientButton from "@/components/ui/GradientButton";
import GlassInput from "@/components/ui/GlassInput";

interface EditProjectModalProps {
  project: ProjectWithClient;
}

export default function EditProjectModal({ project }: EditProjectModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false); 
  const router = useRouter();

  const [title, setTitle] = useState(project.title);
  const [invoiceAmount, setInvoiceAmount] = useState(
    String(project.invoiceAmount)
  );
  const [clientId, setClientId] = useState(project.clientId);
  const [status, setStatus] = useState(project.status);
  const [deliveryLink, setDeliveryLink] = useState(project.deliveryLink || "");
  const [sampleImages, setSampleImages] = useState([
    project.sampleImageUrls[0] || "",
    project.sampleImageUrls[1] || "",
    project.sampleImageUrls[2] || "",
  ]);

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
        } catch (err) {
          if (err instanceof Error)
            setError("Could not load clients: " + err.message);
        }
      };
      fetchClients();
    }
  }, [isOpen]);

  const handleSampleImageChange = (index: number, value: string) => {
    const newSamples = [...sampleImages];
    newSamples[index] = value;
    setSampleImages(newSamples);
  };

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
          title,
          invoiceAmount: parseInt(invoiceAmount, 10) || 0,
          clientId,
          status,
          deliveryLink,
          sampleImageUrls: sampleImages.filter((url) => url !== ""),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update project");
      }

      setIsOpen(false);
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const glassSelectClass =
    "w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30 appearance-none cursor-pointer";

  // Define the Modal Content separately
  const modalContent = (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal Box */}
      <div className="bg-[#0f172a] border border-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative z-10 scrollbar-hide">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-blue-500/50 to-transparent"></div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif text-white">Edit Project</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GlassInput
              label="Project Title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5 ml-1">
                Assign Client
              </label>
              <select
                id="client"
                className={glassSelectClass}
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                required
              >
                <option value="" disabled className="bg-slate-900">
                  Select client...
                </option>
                {clients.map((client) => (
                  <option
                    key={client.id}
                    value={client.id}
                    className="bg-slate-900"
                  >
                    {client.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5 ml-1">
                Status
              </label>
              <select
                id="status"
                className={glassSelectClass}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="BOOKED" className="bg-slate-900">
                  Booked
                </option>
                <option value="EDITING" className="bg-slate-900">
                  Editing
                </option>
                <option value="FINALS_READY" className="bg-slate-900">
                  Finals Ready
                </option>
                <option value="PAID" className="bg-slate-900">
                  Paid
                </option>
              </select>
            </div>
            <GlassInput
              label="Amount (₹)"
              id="amount"
              type="number"
              value={invoiceAmount}
              onChange={(e) => setInvoiceAmount(e.target.value)}
              required
            />
          </div>

          <div className="h-px bg-white/10 my-4" />
          <h3 className="text-lg font-medium text-white">Delivery Details</h3>
          <GlassInput
            label="Google Drive Link"
            id="deliveryLink"
            type="url"
            placeholder="https://drive.google.com/..."
            value={deliveryLink}
            onChange={(e) => setDeliveryLink(e.target.value)}
          />

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5 ml-1">
              Sneak Peek Images (URLs)
            </label>
            <div className="space-y-3">
              {sampleImages.map((url, idx) => (
                <GlassInput
                  key={idx}
                  placeholder={`Image URL ${idx + 1}`}
                  value={url}
                  onChange={(e) => handleSampleImageChange(idx, e.target.value)}
                  className="mb-0"
                />
              ))}
            </div>
          </div>

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
              Save Changes
            </GradientButton>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        title="Edit Project"
      >
        <Edit2 size={16} />
      </button>

      {/* USE PORTAL TO RENDER MODAL OUTSIDE THE CARD */}
      {isOpen && mounted && createPortal(modalContent, document.body)}
    </>
  );
}
