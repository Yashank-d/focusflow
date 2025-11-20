"use client";
import { useState, FormEvent } from "react";
import { createPortal } from "react-dom"; // <--- IMPORT THIS
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import GradientButton from "@/components/ui/GradientButton";
import GlassInput from "@/components/ui/GlassInput";

export default function CreateClientModal() {
  const [isOpen, setIsOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const resetForm = () => {
    setName("");
    setEmail("");
    setError(null);
    setIsLoading(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create client");
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
      setIsLoading(false);
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      <div className="bg-[#0f172a] border border-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden z-10">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-purple-500/50 to-transparent"></div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif text-white">Add Client</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <GlassInput
            label="Client Name"
            id="name"
            placeholder="e.g., John & Jane Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <GlassInput
            label="Client Email"
            id="email"
            type="email"
            placeholder="client@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              Create Client
            </GradientButton>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <>
      <GradientButton onClick={() => setIsOpen(true)}>
        + New Client
      </GradientButton>

      {isOpen &&
        typeof window !== "undefined" &&
        createPortal(modalContent, document.body)}
    </>
  );
}
