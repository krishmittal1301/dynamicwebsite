// src/app/login/page.tsx
"use client";

import { loginAdmin } from "./action";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center font-sans">
      <form action={async (fd) => {
        const res = await loginAdmin(fd);
        if (res?.error) setError(res.error);
      }} className="w-full max-w-md p-12 border border-white/5 bg-white/[0.02] space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-serif italic text-[#C5A358]">Admin Portal</h1>
          <p className="text-[10px] tracking-[0.4em] uppercase text-gray-500">Authorized Access Only</p>
        </div>

        <div className="space-y-6">
          <input name="email" type="email" placeholder="Email" required 
            className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-[#C5A358] transition-colors" />
          <input name="password" type="password" placeholder="Password" required 
            className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-[#C5A358] transition-colors" />
        </div>

        {error && <p className="text-red-500 text-[10px] uppercase tracking-widest text-center">{error}</p>}

        <button type="submit" className="w-full py-4 bg-[#C5A358] text-black text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white transition-all">
          Verify Identity
        </button>
      </form>
    </div>
  );
}