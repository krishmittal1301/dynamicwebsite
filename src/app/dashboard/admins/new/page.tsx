// src/app/dashboard/admins/new/page.tsx
import { createAdmin } from "./action";

export default function NewAdminPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] p-8 flex items-center justify-center">
      <div className="w-full max-w-md bg-white/[0.02] border border-white/10 p-10">
        <h1 className="text-3xl font-serif italic text-[#C5A358] mb-2">Initialize Admin</h1>
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-8">System Credential Provisioning</p>
        
        <form action={createAdmin} className="space-y-6">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-gray-500 block mb-2">Full Name</label>
            <input 
              name="name" 
              type="text" 
              required 
              className="w-full bg-white/5 border border-white/10 p-3 text-white outline-none focus:border-[#C5A358] transition-all" 
            />
          </div>
          
          <div>
            <label className="text-[10px] uppercase tracking-widest text-gray-500 block mb-2">Email Address</label>
            <input 
              name="email" 
              type="email" 
              required 
              className="w-full bg-white/5 border border-white/10 p-3 text-white outline-none focus:border-[#C5A358] transition-all" 
            />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-widest text-gray-500 block mb-2">Assign Role</label>
            <select 
              name="role" 
              className="w-full bg-[#1A1A1A] border border-white/10 p-3 text-white outline-none focus:border-[#C5A358] appearance-none cursor-pointer"
            >
              <option value="VENUE_OWNER">Venue Owner</option>
              <option value="admin">Super Admin</option> 
            </select>
            {/* Note: value="admin" matches your action.ts logic for SUPER_ADMIN */}
          </div>
          
          <div>
            <label className="text-[10px] uppercase tracking-widest text-gray-500 block mb-2">Temporary Password</label>
            <input 
              name="password" 
              type="password" 
              required 
              className="w-full bg-white/5 border border-white/10 p-3 text-white outline-none focus:border-[#C5A358] transition-all" 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#C5A358] text-black py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-all mt-4"
          >
            Create Admin Account
          </button>
        </form>
      </div>
    </div>
  );
}