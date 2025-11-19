"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="text-gray-500">Loading...</div>;
  }

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-gray-700">{session.user?.name}</span>
        <button
          onClick={() => signOut()}
          className="text-gray-600 font-medium px-4 py-2 rounded-lg hover:bg-gray-100"
        >
          LogOut
        </button>
      </div>
    );
  }
  return (
    <button
      onClick={() => signIn("google")}
      className="bg-white text-black font-medium px-10 py-3.5 rounded-full hover:bg-gray-200 hover:scale-105 transition-all duration-500 shadow-[0_0_40px_-10px_rgba(255,255,255,0.2)]"
    >
      Get Started
    </button>
  );
}
