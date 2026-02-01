"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-[#C5A358] transition-all"
    >
      Terminate Session
    </button>
  );
}