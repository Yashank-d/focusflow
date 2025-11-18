"use client";

import { useState } from "react";

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
      className={`text-sm font-medium transition-colors ${
        isCopied ? "text-green-600" : "text-blue-600 hover:text-blue-800"
      }`}
    >
      {isCopied ? "✓ Copied!" : "Copy Link"}
    </button>
  );
}
