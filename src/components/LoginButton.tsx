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
      className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
    >
      Log In with Google
    </button>
  );
}
