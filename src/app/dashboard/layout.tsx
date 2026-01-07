"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Menu } from "lucide-react";
import DashboardTour from "@/components/DashboardTour";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex w-full relative">
      <DashboardTour />
      <div className="md:hidden fixed top-0 left-0 w-full h-14 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/10 z-30 flex items-center justify-between px-4">
        <button
          className="p-2 rounded-lg bg-white/10 border border-white/10 text-white"
          onClick={() => setIsMobileOpen(true)}
        >
          <Menu size={22} />
        </button>

        <span className="ml-4 text-white font-serif text-xl">FocusFlow</span>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 transform transition-transform duration-300 md:hidden ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar onItemClick={() => setIsMobileOpen(false)} mobile />
      </div>

      {/* Page Content */}
      <main className="flex-1 md:ml-64 p-6 md:p-12 pt-20 md:pt-12">
        {children}
      </main>
    </div>
  );
}
