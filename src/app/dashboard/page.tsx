import prisma from "@/lib/prisma"; //
import { Edit3, ExternalLink, LayoutDashboard, Plus } from "lucide-react";
import Link from "next/link"; //

export default async function Dashboard() {
  // Direct Server-Side Fetching with Prisma
  const venues = await prisma.venue.findMany({
    select: {
      name: true,
      slug: true,
      tagline: true,
      brand_year: true,
    },
    orderBy: {
      created_at: 'desc'
    }
  });

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-12 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-16">
          <h1 className="text-5xl font-serif italic text-[#C5A358]">
            Managed Legacies
          </h1>
          <Link
            href="/onboarding" //
            className="border border-[#C5A358] px-8 py-3 text-[10px] uppercase tracking-widest text-[#C5A358] hover:bg-[#C5A358] hover:text-black transition-all"
          >
            + New Venue
          </Link>
        </div>

        <div className="grid gap-6">
          {venues.map((venue) => (
            <div
              key={venue.slug}
              className="bg-white/[0.02] border border-white/5 p-8 flex justify-between items-center group hover:border-[#C5A358]/30 transition-all"
            >
              <div>
                <h2 className="text-2xl font-serif uppercase tracking-tighter">
                  {venue.name}
                </h2>
                <p className="text-xs text-gray-500 tracking-widest uppercase mt-2">
                  {venue.tagline}
                </p>
              </div>
              <div className="flex gap-4">
                <Link
                  href={`/${venue.slug}/reservations`} //
                  className="p-3 bg-white/5 hover:text-[#C5A358] transition-colors flex items-center gap-2"
                  title="View Reservations"
                >
                  <LayoutDashboard size={18} />
                  <span className="text-[8px] uppercase tracking-tighter hidden group-hover:block">
                    Requests
                  </span>
                </Link>
                <Link
                  href={`/${venue.slug}`} //
                  className="p-3 bg-white/5 hover:text-[#C5A358] transition-colors"
                >
                  <ExternalLink size={18} />
                </Link>
                <Link
                  href={`/edit/${venue.slug}`} //
                  className="p-3 bg-white/5 hover:text-[#C5A358] transition-colors"
                >
                  <Edit3 size={18} />
                </Link>
              </div>
            </div>
          ))}
          
          {venues.length === 0 && (
            <div className="text-center py-20 border border-dashed border-white/10">
              <p className="text-gray-500 font-serif italic">No legacies found in the local database.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}