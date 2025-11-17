import React from "react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">FocusFLow</h2>
        </div>
        <nav className="mt-4">
          <Link
            href="/dashboard/projects"
            className="block px-6 py-3 text-gray-700 hover:bg-gray-200"
          >
            Projects
          </Link>
          <Link
            href="/dashboard/clients"
            className="block px-6 py-3 text-gray-700 hover:bg-gray-200"
          >
            Clients
          </Link>
        </nav>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
