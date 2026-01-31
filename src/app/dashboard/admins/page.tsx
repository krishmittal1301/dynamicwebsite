// src/app/dashboard/admins/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminListPage() {
  const admins = await prisma.admin.findMany({
    orderBy: { created_at: 'desc' }
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">System Administrators</h1>
        <Link href="/dashboard/admins/new" className="bg-green-600 text-white px-4 py-2 rounded">
          + Add New Admin
        </Link>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Email</th>
            <th className="text-left p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {admins.map(admin => (
            <tr key={admin.id} className="border-b">
              <td className="p-2">{admin.name}</td>
              <td className="p-2">{admin.email}</td>
              <td className="p-2 capitalize">{admin.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}