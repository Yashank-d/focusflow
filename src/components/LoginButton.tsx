"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Skeleton from "@/components/ui/Skeleton";

export default function LoginButton() {
  const { data: session, status } = useSession();

  // Loading State
  if (status === "loading") {
    return <Skeleton className="w-full h-12 rounded-xl" />;
  }

  // STATE 1: LOGGED IN (Sidebar Mode)
  if (session) {
    return (
      <div className="flex items-center justify-between w-full gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors group">
        {/* User Info Section */}
        <div className="flex items-center gap-3 overflow-hidden">
          {/* Avatar */}
          {session.user?.image ? (
            <Image
              src={session.user.image}
              alt="User"
              width={36}
              height={36}
              className="rounded-full border border-white/10 shadow-sm"
            />
          ) : (
            // Fallback Avatar
            <div className="w-9 h-9 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-inner">
              {session.user?.name?.[0] || "U"}
            </div>
          )}

          {/* Name & Email */}
          <div className="flex flex-col text-left min-w-0">
            <span className="text-sm font-medium text-white truncate max-w-[110px]">
              {session.user?.name}
            </span>
            <span className="text-[10px] text-gray-400 truncate max-w-[110px]">
              {session.user?.email}
            </span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => signOut()}
          className="p-2 text-gray-500 hover:text-red-400 hover:bg-white/10 rounded-lg transition-all"
          title="Sign Out"
        >
          <LogOut size={18} />
        </button>
      </div>
    );
  }

  // STATE 2: LOGGED OUT (Landing Page Mode)
  return (
    <button
      onClick={() => signIn("google")}
      className="relative group overflow-hidden px-8 py-3 rounded-full bg-white text-black font-semibold transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]"
    >
      <span className="relative z-10">Get Started</span>
      {/* Subtle hover gradient */}
      <div className="absolute inset-0 bg-linear-to-r from-blue-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}
