"use client";

import { useState } from "react";
import { Plus, X, Camera, Loader2, Edit2 } from "lucide-react";
import { manageMenu } from "@/lib/actions/menu-actions";

interface MenuModalProps {
  venueId: string;
  type: "dish" | "drink";
  initialData?: any; // If present, we are EDITING
  index?: number;    // Required for editing/deleting
}

export default function MenuModal({ venueId, type, initialData, index }: MenuModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [itemImage, setItemImage] = useState<File | null>(null);
  const isEditing = !!initialData;

  const uploadAsset = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", type === "dish" ? "dishes" : "drinks");
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    return data.url;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);
    const formData = new FormData(e.currentTarget);

    try {
      let imageUrl = initialData?.image_url || "";
      if (itemImage) {
        imageUrl = await uploadAsset(itemImage);
      }

      const data = {
        name: formData.get("name"),
        price: formData.get("price"),
        description: formData.get("description"),
        image_url: imageUrl,
      };

      await manageMenu(venueId, type, isEditing ? "UPDATE" : "CREATE", {
        index: index,
        data: data
      });

      setIsOpen(false);
    } catch (err) {
      alert("Protocol Breach: Failed to save item");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 bg-white/5 border border-white/5 hover:text-[#C5A358] transition-all flex items-center gap-2"
      >
        {isEditing ? <Edit2 size={14} /> : <Plus size={16} />}
        <span className="text-[9px] uppercase tracking-widest hidden md:block">
          {isEditing ? "Edit" : `Add ${type}`}
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-[100] flex items-center justify-center p-6 text-white">
          <div className="bg-[#0A0A0A] border border-[#C5A358]/30 p-10 max-w-lg w-full relative">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-gray-500"><X /></button>
            
            <h2 className="text-[#C5A358] font-serif italic text-3xl mb-1">
              {isEditing ? "Modify Entry" : `New ${type}`}
            </h2>
            <p className="text-[9px] uppercase tracking-[0.3em] text-gray-500 mb-8">Menu Archives</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input name="name" defaultValue={initialData?.name} placeholder="ITEM NAME" required className="w-full bg-white/5 border border-white/10 p-4 outline-none focus:border-[#C5A358]" />
              <input name="price" defaultValue={initialData?.price} placeholder="PRICE" required className="w-full bg-white/5 border border-white/10 p-4 outline-none focus:border-[#C5A358]" />
              
              <div className="relative border border-dashed border-white/10 h-32 flex items-center justify-center group hover:border-[#C5A358]/40 transition-all">
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setItemImage(e.target.files?.[0] || null)} />
                {itemImage || initialData?.image_url ? (
                  <img src={itemImage ? URL.createObjectURL(itemImage) : initialData.image_url} className="h-full w-full object-cover p-2" />
                ) : (
                  <Camera className="text-gray-700" />
                )}
              </div>

              <textarea name="description" defaultValue={initialData?.description} placeholder="DESCRIPTION" className="w-full bg-white/5 border border-white/10 p-4 h-24 outline-none focus:border-[#C5A358]" />
              
              <button type="submit" disabled={isUploading} className="w-full bg-[#C5A358] text-black py-4 text-[10px] font-bold uppercase tracking-[0.2em] disabled:opacity-50">
                {isUploading ? <Loader2 className="animate-spin mx-auto" /> : "Authorize Entry"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}