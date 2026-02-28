"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderOpen, Users, X } from "lucide-react";
import LoginButton from "@/components/LoginButton";
import FocusFlowLogo from "@/components/ui/FocusFlowLogo"; // ← new shared logo

const navItems = [
  { label: "Projects", icon: FolderOpen, href: "/dashboard/projects" },
  { label: "Clients", icon: Users, href: "/dashboard/clients" },
];

type SidebarProps = {
  onItemClick?: () => void;
  mobile?: boolean;
};

export default function Sidebar({ onItemClick, mobile = false }: SidebarProps) {
  const pathname = usePathname();

  const baseClass = mobile
    ? "flex flex-col w-64 h-full border-r border-white/10 bg-[#0f172a]/60 backdrop-blur-xl"
    : "hidden md:flex flex-col w-64 h-screen border-r border-white/10 bg-[#0f172a]/60 backdrop-blur-xl fixed left-0 top-0 z-40";

  return (
    <aside className={baseClass}>
      {/* ── Logo / header ─────────────────────────────────────────────── */}
      {mobile ? (
        // Mobile: compact header with close button
        <div className="px-4 py-3 flex items-center justify-between border-b border-white/6">
          <FocusFlowLogo size="sm" showSubtitle={false} />
          <button
            onClick={() => onItemClick?.()}
            aria-label="Close menu"
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        // Desktop: full logo + subtitle
        <div className="px-6 pt-8 pb-6">
          <FocusFlowLogo size="md" showSubtitle={true} />
        </div>
      )}

      {/* ── Nav items ─────────────────────────────────────────────────── */}
      <nav className="flex-1 px-3 space-y-1 mt-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => onItemClick?.()}
              className={`
                relative flex items-center gap-3 px-4 py-3 rounded-xl
                transition-all duration-200 group overflow-hidden
                ${
                  isActive
                    ? "text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }
              `}
            >
              {/* Active indicator — indigo left border + subtle background */}
              {isActive && (
                <div className="absolute inset-0 bg-linear-to-r from-indigo-500/15 to-transparent border-l-2 border-indigo-400 rounded-xl" />
              )}

              <Icon
                size={18}
                className={`relative z-10 shrink-0 ${
                  isActive
                    ? "text-indigo-400"
                    : "text-gray-500 group-hover:text-gray-300"
                }`}
              />
              <span className="relative z-10 text-sm font-medium tracking-wide">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* ── Bottom: sign out ──────────────────────────────────────────── */}
      <div className="p-4 border-t border-white/6">
        <LoginButton />
      </div>
    </aside>
  );
}
