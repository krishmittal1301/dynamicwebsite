"use client";

import { useState } from "react";
import { Plus, X, Camera, Loader2 } from "lucide-react";
import { addVenueEvent } from "@/lib/actions/event-actions";

export default function AddEventModal({ venueId }: { venueId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [eventImage, setEventImage] = useState<File | null>(null);

  // Reusing your established upload pattern
  const uploadAsset = async (file: File, folder: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Upload failed");

    return data.url; 
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      // 1. Handle the Image Upload first if a file exists
      if (eventImage) {
        const uploadedUrl = await uploadAsset(eventImage, "events");
        formData.set("image_url", uploadedUrl);
      }

      // 2. Execute the Server Action
      await addVenueEvent(venueId, formData);
      
      // 3. Cleanup
      setIsOpen(false);
      setEventImage(null);
    } catch (err: any) {
      alert("Protocol Error: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-3 bg-white/5 border border-white/5 hover:border-[#C5A358]/50 hover:text-[#C5A358] transition-all flex items-center gap-2 group"
      >
        <Plus size={18} />
        <span className="text-[9px] uppercase tracking-widest hidden group-hover:block">
          Add Venue Event
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-6">
          <div className="bg-[#0A0A0A] border border-[#C5A358]/30 p-10 max-w-lg w-full relative">
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute top-4 right-4 text-gray-500 hover:text-white"
            >
              <X size={20} />
            </button>

            <h2 className="text-[#C5A358] font-serif italic text-3xl mb-1">New Event</h2>
            <p className="text-[9px] uppercase tracking-[0.3em] text-gray-500 mb-8">
              Update Venue Programming
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <input 
                  name="title" 
                  placeholder="EVENT TITLE" 
                  required 
                  className="col-span-2 bg-white/5 border border-white/10 p-3 text-white text-xs outline-none focus:border-[#C5A358]" 
                />

                {/* Styled Image Upload Area */}
                <div className="col-span-2 space-y-2">
                   <label className="text-[8px] uppercase tracking-[0.2em] text-[#C5A358]">Event Poster</label>
                   <div className="relative border border-dashed border-white/10 h-24 flex items-center justify-center group hover:border-[#C5A358]/40 transition-all">
                      <input 
                        type="file" 
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) => setEventImage(e.target.files?.[0] || null)}
                      />
                      {eventImage ? (
                        <div className="flex items-center gap-3">
                           <img src={URL.createObjectURL(eventImage)} className="h-16 w-16 object-cover border border-[#C5A358]/20" />
                           <span className="text-[10px] text-gray-400">Poster Locked</span>
                        </div>
                      ) : (
                        <div className="text-center text-gray-600">
                          <Camera size={20} className="mx-auto mb-1" />
                          <span className="text-[8px] uppercase tracking-widest">Select Visual Asset</span>
                        </div>
                      )}
                   </div>
                </div>

                <input 
                  name="headliner" 
                  placeholder="HEADLINER / DJ" 
                  className="bg-white/5 border border-white/10 p-3 text-white text-xs outline-none focus:border-[#C5A358]" 
                />
                <input 
                  name="event_time" 
                  placeholder="TIME (e.g. 11 PM)" 
                  className="bg-white/5 border border-white/10 p-3 text-white text-xs outline-none focus:border-[#C5A358]" 
                />
                <input 
                  name="event_date" 
                  type="date" 
                  required 
                  className="bg-white/5 border border-white/10 p-3 text-white text-xs outline-none focus:border-[#C5A358]" 
                />
                {/* Fallback for manual URL if needed */}
                <input 
                  name="image_url" 
                  placeholder="OR EXTERNAL URL" 
                  className="bg-white/5 border border-white/10 p-3 text-white text-xs outline-none focus:border-[#C5A358]" 
                />
              </div>
              
              <textarea 
                name="description" 
                placeholder="EVENT DESCRIPTION" 
                className="w-full bg-white/5 border border-white/10 p-3 text-white text-xs outline-none focus:border-[#C5A358] h-24 resize-none" 
              />
              
              <button 
                type="submit" 
                disabled={isUploading}
                className="w-full bg-[#C5A358] text-black py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isUploading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Synchronizing Assets...
                  </>
                ) : "Authorize & Publish"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}