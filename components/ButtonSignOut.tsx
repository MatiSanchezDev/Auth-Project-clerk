"use client";
import { useClerk } from "@clerk/nextjs";

export const ButtonSignOut = () => {
  const { signOut } = useClerk();
  return (
    <button
      onClick={() => signOut({ redirectUrl: "/" })}
      className="text-white font-bold bg-red-600 px-4 py-2 rounded-lg cursor-pointer hover:bg-red-800"
    >
      Sign out
    </button>
  );
};
