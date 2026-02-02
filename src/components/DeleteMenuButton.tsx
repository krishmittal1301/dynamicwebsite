"use client";

import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { manageMenu } from "@/lib/actions/menu-actions";

interface DeleteProps {
  venueId: string;
  type: "dish" | "drink";
  index: number;
}

export default function DeleteMenuButton({ venueId, type, index }: DeleteProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to remove this item?")) return;
    
    setIsDeleting(true);
    await manageMenu(venueId, type, "DELETE", { index });
    setIsDeleting(false);
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-900 p-2 hover:bg-red-950/30 transition-all disabled:opacity-50"
    >
      {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
    </button>
  );
}