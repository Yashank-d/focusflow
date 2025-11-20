import React from "react";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex relative text-brand-text-main">
      <div className="fixed top-0 left-0 w-full h-[40vh] bg-(image:--image-glow) opacity-40 pointer-events-none z-0"></div>

      <Sidebar />

      <main className="flex-1 md:ml-64 relative z-10 p-8 md:p-12 overflow-y-auto h-screen scrollbar-hide transition-all duration-300 animate-fade-in">
        <div className="max-w-7xl mx-auto animate-fade-in">{children}</div>
      </main>
    </div>
  );
}
