"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Trash2, AlertTriangle } from "lucide-react";
import GradientButton from "@/components/ui/GradientButton";

interface DeleteProjectButtonProps {
  projectId: string;
}

export default function DeleteProjectButton({
  projectId,
}: DeleteProjectButtonProps) {
  const router = useRouter();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false); 
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/projects/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId }),
      });

      if (!response.ok) throw new Error("Failed to delete");

      setIsConfirmOpen(false);
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to delete project");
    } finally {
      setIsLoading(false);
    }
  };

  // The Confirmation Modal Markup
  const confirmModal = (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => !isLoading && setIsConfirmOpen(false)}
      />

      {/* Modal Box */}
      <div className="bg-[#0f172a] border border-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-sm relative overflow-hidden z-10 text-center">
        {/* Red Glow */}
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-red-500 to-transparent"></div>

        {/* Icon */}
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="text-red-500" size={32} />
        </div>

        <h3 className="text-xl font-serif text-white mb-2">Delete Project?</h3>
        <p className="text-gray-400 text-sm mb-8">
          Are you sure you want to delete this project? This action cannot be
          undone.
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
            Delete Forever
          </GradientButton>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setIsConfirmOpen(true)} // Open custom modal instead of window.confirm
        disabled={isLoading}
        className="p-2 text-red-400/80 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-300"
        title="Delete Project"
      >
        <Trash2 size={16} />
      </button>

      {isConfirmOpen && createPortal(confirmModal, document.body)}
    </>
  );
}
