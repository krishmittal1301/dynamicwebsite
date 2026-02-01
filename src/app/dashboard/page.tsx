import prisma from "@/lib/prisma"; //
import { Edit3, ExternalLink, LayoutDashboard, Plus } from "lucide-react";
import Link from "next/link"; //
import { auth } from "@/auth"; // This points to your src/auth.ts
import LogoutButton from "@/components/signout";
import { redirect } from "next/navigation";
import VenueStatusToggle from "@/components/VenueStatusToggle"; //
import AddEventModal from "@/components/AddEventModal";

export default async function Dashboard() {
  const session = await auth();
  if (!session) redirect("/login");

  const userRole = session.user?.role;
  const userId = session.user?.id;

  const venues = await prisma.venue.findMany({
    where: userRole === "SUPER_ADMIN" ? {} : { owner_id: userId },
    select: {
      id: true,
      name: true,
      slug: true,
      tagline: true,
      brand_year: true,
      is_active: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-12 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h1 className="text-5xl font-serif italic text-[#C5A358]">
              Managed Legacies
            </h1>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mt-4">
              System Control Panel
            </p>
            <p className="text-[9px] uppercase tracking-[0.1em] text-[#C5A358]/60">
              Authenticated as:{" "}
              <span className="text-white">
                {session.user?.name || session.user?.email}
              </span>
              <span className="mx-2 text-gray-700">|</span>
              Role:{" "}
              <span className="text-white">{userRole?.replace("_", " ")}</span>
            </p>
          </div>

          <div className="flex gap-4">
            {/* Team Management Button */}
            {userRole === "SUPER_ADMIN" && (
              <Link
                href="/dashboard/admins"
                className="border border-white/10 px-8 py-3 text-[10px] uppercase tracking-widest text-gray-400 hover:border-white hover:text-white transition-all flex items-center gap-2"
              >
                Create new Admin
              </Link>
            )}
            {/* 2. New Venue button logic:
      - Super Admins can always see it OR
      - Venue Owners see it ONLY if they haven't created their first venue yet
  */}
            {(userRole === "SUPER_ADMIN" ||
              (userRole === "VENUE_OWNER" && venues.length === 0)) && (
              <Link
                href="/onboarding"
                className="border border-[#C5A358] px-8 py-3 text-[10px] uppercase tracking-widest text-[#C5A358] hover:bg-[#C5A358] hover:text-black transition-all"
              >
                + New Venue
              </Link>
            )}{" "}
            <LogoutButton />
          </div>
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
                <div className="flex gap-4 items-center">
                  {userRole === "SUPER_ADMIN" && (
                    <VenueStatusToggle
                      slug={venue.slug}
                      initialStatus={venue.is_active}
                    />
                  )}
                </div>{" "}
                <AddEventModal venueId={venue.id} />
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
              <p className="text-gray-500 font-serif italic">
                No legacies found in the local database.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
