"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // This calls the 'authorize' function you wrote in auth.ts
    console.log("🚀 Starting login process for:", email); // Log start
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    console.log("Login Result:", result);

  if (result?.ok) {
      // 1. Force a refresh to ensure the session is detected
      console.log("✅ Authorization Confirmed. Syncing Secure Session...");
      router.refresh(); 
      // 2. Redirect to the system control panel
      router.push("/dashboard");
    } else {
      alert("Protocol Error: Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-white p-6">
      <div className="w-full max-w-md bg-white/[0.02] border border-white/10 p-10">
        <h1 className="text-4xl font-serif italic text-[#C5A358] mb-2">Protocol</h1>
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-8">System Authentication</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <input 
            type="email" 
            placeholder="ADMIN EMAIL"
            className="w-full bg-white/5 border border-white/10 p-4 outline-none focus:border-[#C5A358] transition-all text-sm"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="SECURITY KEY"
            className="w-full bg-white/5 border border-white/10 p-4 outline-none focus:border-[#C5A358] transition-all text-sm"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-[#C5A358] text-black py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-all">
            Authorize Entry
          </button>
        </form>
      </div>
    </div>
  );
}