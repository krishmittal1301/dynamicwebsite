"use client"; // This is required for interactivity

import { useState } from "react";
import { toggleVenueStatus } from "@/lib/actions/venue-actions";

interface Props {
  slug: string;
  initialStatus: boolean;
}

export default function VenueStatusToggle({ slug, initialStatus }: Props) {
  const [isActive, setIsActive] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      // This calls the Server Action to update the DB
      await toggleVenueStatus(slug, !isActive);
      setIsActive(!isActive);
    } catch (error) {
      alert("Failed to update status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`px-4 py-2 text-[8px] uppercase tracking-widest border transition-all ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      } ${
        isActive
          ? "border-green-500/50 text-green-400 hover:bg-red-500 hover:text-white"
          : "border-red-500/50 text-red-400 hover:bg-green-500 hover:text-white"
      }`}
    >
      {loading ? "Processing..." : isActive ? "Pause Venue" : "Resume Venue"}
    </button>
  );
}