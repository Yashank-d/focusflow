"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Trash2, AlertTriangle } from "lucide-react";
import GradientButton from "@/components/ui/GradientButton";

interface DeleteClientButtonProps {
  clientId: string;
}

export default function DeleteClientButton({
  clientId,
}: DeleteClientButtonProps) {
  const router = useRouter();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/clients/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId }),
      });
      if (!response.ok) throw new Error("Failed");

      setIsConfirmOpen(false);
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to delete client");
    } finally {
      setIsLoading(false);
    }
  };

  const confirmModal = (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => !isLoading && setIsConfirmOpen(false)}
      />

      <div className="bg-[#0f172a] border border-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-sm relative overflow-hidden z-10 text-center">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-red-500 to-transparent"></div>

        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="text-red-500" size={32} />
        </div>

        <h3 className="text-xl font-serif text-white mb-2">Delete Client?</h3>
        <p className="text-gray-400 text-sm mb-8">
          <span className="text-red-400 font-bold">Warning:</span> This will
          also permanently delete all projects and invoices associated with this
          client.
        </p>

        <div className="flex gap-3 justify-center">
          <GradientButton
            variant="secondary"
            onClick={() => setIsConfirmOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </GradientButton>

          <GradientButton
            variant="danger"
            onClick={handleDelete}
            isLoading={isLoading}
          >
            Delete Everything
          </GradientButton>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setIsConfirmOpen(true)}
        disabled={isLoading}
        className="p-2 text-red-400/80 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-300"
        title="Delete Client"
      >
        <Trash2 size={16} />
      </button>

      {isConfirmOpen && createPortal(confirmModal, document.body)}
    </>
  );
}
