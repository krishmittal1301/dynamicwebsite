// src/app/dashboard/admins/new/page.tsx
import { createAdmin } from "./action";

export default function NewAdminPage() {
  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create New Admin</h1>
      
      <form action={createAdmin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input name="name" type="text" required className="w-full p-2 border rounded text-black" />
        </div>
        
        <div>
          <label className="block text-sm font-medium">Email Address</label>
          <input name="email" type="email" required className="w-full p-2 border rounded text-black" />
        </div>
        
        <div>
          <label className="block text-sm font-medium">Temporary Password</label>
          <input name="password" type="password" required className="w-full p-2 border rounded text-black" />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Create Admin Account
        </button>
      </form>
    </div>
  );
}