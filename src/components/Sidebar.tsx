"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderOpen, Users, X } from "lucide-react"; // Keep lucide-react
import LoginButton from "@/components/LoginButton";

const navItems = [
  { label: "Projects", icon: FolderOpen, href: "/dashboard/projects", id: "nav-projects" },
  { label: "Clients", icon: Users, href: "/dashboard/clients", id: "nav-clients" },
];

type SidebarProps = {
  onItemClick?: () => void;
  mobile?: boolean;
};

export default function Sidebar({ onItemClick, mobile = false }: SidebarProps) {
  const pathname = usePathname();

  // Desktop class (unchanged) vs mobile container differences
  const baseClass = mobile
    ? "flex flex-col w-64 h-full border-r border-white/10 bg-[#0f172a]/60 backdrop-blur-xl"
    : "hidden md:flex flex-col w-64 h-screen border-r border-white/10 bg-[#0f172a]/60 backdrop-blur-xl fixed left-0 top-0 z-40";

  return (
    <aside className={baseClass}>
      {/* Desktop or Mobile: show a small top area.
          On mobile we show a visible close X (since the drawer doesn't have another close).
          On desktop we keep original layout.
      */}
      {mobile && (
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="font-serif text-white text-lg font-bold">F</span>
            </div>
            <h1 className="font-serif text-sm text-white">FocusFlow</h1>
          </div>

          <button
            onClick={() => onItemClick?.()}
            aria-label="Close menu"
            className="p-2 text-gray-300 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* If not mobile, show the original logo block (keeps same UI as before) */}
      {!mobile && (
        <div className="p-8 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.3)]">
              <span className="font-serif text-white text-lg font-bold">F</span>
            </div>
            <div>
              <h1 className="font-serif text-xl text-white tracking-wide">
                FocusFlow
              </h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">
                Studio Manager
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Nav items (same markup) */}
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              id={(item as any).id}
              onClick={() => onItemClick?.()} // ensures it closes on mobile
              className={`
                relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group overflow-hidden
                ${
                  isActive
                    ? "text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }
              `}
            >
              {isActive && (
                <div className="absolute inset-0 bg-linear-to-r from-white/10 to-transparent border-l-2 border-white/50 opacity-100" />
              )}

              <Icon
                size={20}
                className={`relative z-10 ${
                  isActive
                    ? "text-white"
                    : "text-gray-500 group-hover:text-white"
                }`}
              />
              <span className="relative z-10 text-sm font-medium tracking-wide">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <LoginButton />
      </div>
    </aside>
  );
}
