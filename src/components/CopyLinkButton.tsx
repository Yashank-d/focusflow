"use client";

import { useState } from "react";
import { Link as LinkIcon, Check } from "lucide-react";

interface CopyLinkButtonProps {
  projectId: string;
}

export default function CopyLinkButton({ projectId }: CopyLinkButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    const link = `${window.location.origin}/client/${projectId}`;
    try {
      await navigator.clipboard.writeText(link);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 4000);
    } catch (err) {
      console.error("Failed to copy:", err);
      alert("Failed to copy link");
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`
        flex items-center gap-2 text-sm font-medium transition-all duration-300 px-3 py-1.5 rounded-lg
        ${
          isCopied
            ? "bg-emerald-500/10 text-emerald-400"
            : "text-gray-400 hover:text-white hover:bg-white/5"
        }
      `}
    >
      {isCopied ? <Check size={14} /> : <LinkIcon size={14} />}
      {isCopied ? "Copied" : "Copy Link"}
    </button>
  );
}
