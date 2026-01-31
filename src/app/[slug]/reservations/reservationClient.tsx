"use client";

import { useState, useTransition } from "react";
import { updateReservationStatus } from "./action";
import { Check, X, Clock, Phone, Calendar, Users, Mail } from "lucide-react";

export default function ReservationsClient({ venue, slug }: { venue: any, slug: string }) {
  const [activeTab, setActiveTab] = useState<"tables" | "inquiries">("tables");
  const [isPending, startTransition] = useTransition();

  const handleStatusUpdate = (type: 'table' | 'inquiry', id: string, status: string) => {
    startTransition(async () => {
      await updateReservationStatus(type, id, status, slug);
    });
  };

  const tableBookings = venue.table_bookings || [];
  const inquiries = venue.inquiries || [];

  return (
    <div className={`min-h-screen bg-[#0A0A0A] text-white p-8 md:p-20 transition-opacity ${isPending ? 'opacity-50' : 'opacity-100'}`}>
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <h1 className="text-4xl font-serif italic mb-2 text-[#C5A358]">
            {venue.name} <span className="text-white/50">Reservations</span>
          </h1>
          <p className="text-[10px] tracking-[0.4em] uppercase text-gray-500">
            Secure and Manage Your Venue's Legacy
          </p>
        </header>

        {/* Tab Switcher */}
        <div className="flex gap-12 border-b border-white/5 mb-12">
          <button
            onClick={() => setActiveTab("tables")}
            className={`pb-4 text-[11px] tracking-[0.3em] uppercase transition-all ${activeTab === "tables" ? "text-[#C5A358] border-b border-[#C5A358]" : "text-gray-500"}`}
          >
            Table Requests ({tableBookings.length})
          </button>
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`pb-4 text-[11px] tracking-[0.3em] uppercase transition-all ${activeTab === "inquiries" ? "text-[#C5A358] border-b border-[#C5A358]" : "text-gray-500"}`}
          >
            Event Inquiries ({inquiries.length})
          </button>
        </div>

        <div className="grid gap-6">
          {activeTab === "tables" ? (
             tableBookings.map((item: any) => (
                <div key={item.id} className="bg-white/[0.02] border border-white/5 p-8 flex flex-col md:flex-row justify-between items-center group hover:border-[#C5A358]/30 transition-all">
                  <div className="space-y-4 w-full">
                    <div className="flex items-center gap-4">
                      <span className={`text-[8px] px-3 py-1 uppercase tracking-widest font-bold ${item.status === "confirmed" ? "bg-green-900/20 text-green-500" : "bg-orange-900/20 text-orange-500"}`}>
                        {item.status || "pending"}
                      </span>
                      <h3 className="text-xl font-serif">{item.name}</h3>
                    </div>
                    {/* ... (rest of table UI) ... */}
                    <div className="flex gap-4">
                        <button onClick={() => handleStatusUpdate('table', item.id, 'confirmed')} className="p-3 border border-white/10 hover:border-green-500 hover:text-green-500 transition-all"><Check size={18} /></button>
                        <button onClick={() => handleStatusUpdate('table', item.id, 'cancelled')} className="p-3 border border-white/10 hover:border-red-500 hover:text-red-500 transition-all"><X size={18} /></button>
                    </div>
                  </div>
                </div>
             ))
          ) : (
            inquiries.map((item: any) => (
                <div key={item.id} className="bg-white/[0.02] border border-white/5 p-8 flex justify-between items-center group hover:border-[#C5A358]/30">
                    <div>
                        <h3 className="text-xl font-serif">{item.name}</h3>
                        <p className="text-gray-400 text-sm italic">"{item.message}"</p>
                    </div>
                    <button onClick={() => handleStatusUpdate('inquiry', item.id, 'processed')} className="px-8 py-3 border border-white/10 hover:border-[#C5A358] hover:text-[#C5A358] text-[10px] uppercase tracking-widest">Mark Processed</button>
                </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}