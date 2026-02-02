import prisma from "@/lib/prisma";
import { Edit3, ExternalLink, LayoutDashboard, Utensils, GlassWater } from "lucide-react";
import Link from "next/link";
import { auth } from "@/auth";
import LogoutButton from "@/components/signout";
import { redirect } from "next/navigation";
import VenueStatusToggle from "@/components/VenueStatusToggle";
import AddEventModal from "@/components/AddEventModal";
import MenuModal from "@/components/MenuModal";
import DeleteMenuButton from "@/components/DeleteMenuButton";

type MenuItem = {
  name: string;
  price: string;
  description: string;
  image_url: string;
};

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
      is_active: true,
      menu_dishes: true,
      menu_drinks: true, // FIXED: Added this to query
    },
    orderBy: { created_at: "desc" },
  });

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-12 text-white font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="flex justify-between items-end mb-16">
          <div>
            <h1 className="text-5xl font-serif italic text-[#C5A358]">Managed Legacies</h1>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mt-4">System Control Panel</p>
            <p className="text-[9px] uppercase tracking-[0.1em] text-[#C5A358]/60 mt-1">
              Authenticated as: <span className="text-white">{session.user?.name}</span>
            </p>
          </div>

          <div className="flex gap-4">
            {userRole === "SUPER_ADMIN" && (
              <Link href="/dashboard/admins" className="border border-white/10 px-8 py-3 text-[10px] uppercase tracking-widest text-gray-400 hover:border-white transition-all">
                New Admin
              </Link>
            )}
            {(userRole === "SUPER_ADMIN" || (userRole === "VENUE_OWNER" && venues.length === 0)) && (
              <Link href="/onboarding" className="border border-[#C5A358] px-8 py-3 text-[10px] uppercase tracking-widest text-[#C5A358] hover:bg-[#C5A358] hover:text-black transition-all">
                + New Venue
              </Link>
            )}
            <LogoutButton />
          </div>
        </div>

        {/* VENUES LIST */}
        <div className="grid gap-12">
          {venues.map((venue) => (
            <div key={venue.id} className="bg-white/[0.02] border border-white/5 p-8 space-y-8 group hover:border-[#C5A358]/20 transition-all">
              
              {/* VENUE TOP BAR */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-serif italic text-white tracking-tight">{venue.name}</h2>
                  <p className="text-[10px] text-gray-500 tracking-[0.2em] uppercase mt-1">{venue.tagline}</p>
                </div>
                <div className="flex gap-3">
                  <Link href={`/${venue.slug}/reservations`} className="p-3 bg-white/5 hover:text-[#C5A358] flex items-center gap-2">
                    <LayoutDashboard size={18} />
                    <span className="text-[8px] uppercase tracking-widest hidden md:block">Requests</span>
                  </Link>
                  {userRole === "SUPER_ADMIN" && <VenueStatusToggle slug={venue.slug} initialStatus={venue.is_active} />}
                  <AddEventModal venueId={venue.id} />
                  <Link href={`/edit/${venue.slug}`} className="p-3 bg-white/5 hover:text-[#C5A358]"><Edit3 size={18} /></Link>
                  <Link href={`/${venue.slug}`} className="p-3 bg-white/5 hover:text-[#C5A358]"><ExternalLink size={18} /></Link>
                </div>
              </div>

              {/* MENU MANAGEMENT (DISHES & DRINKS) */}
              <div className="grid md:grid-cols-2 gap-12 pt-8 border-t border-white/5">
                
                {/* CULINARY ARCHIVE */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-[#C5A358] text-[10px] uppercase tracking-[0.3em] flex items-center gap-2">
                      <Utensils size={14} /> Culinary Archive
                    </h3>
                    <MenuModal venueId={venue.id} type="dish" />
                  </div>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {((venue.menu_dishes as MenuItem[]) || []).length > 0 ? (
                      (venue.menu_dishes as MenuItem[]).map((dish, i) => (
                        <div key={i} className="flex justify-between items-center bg-white/5 p-3 border border-white/5 hover:border-white/10 transition-all group/item">
                          <span className="text-xs font-light text-gray-300">{dish.name}</span>
                          <div className="flex gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                            <MenuModal venueId={venue.id} type="dish" initialData={dish} index={i} />
                            <DeleteMenuButton venueId={venue.id} type="dish" index={i} />
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-[9px] uppercase text-gray-700 italic">No dishes established</p>
                    )}
                  </div>
                </div>

                {/* SPIRIT ARCHIVE */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-[#C5A358] text-[10px] uppercase tracking-[0.3em] flex items-center gap-2">
                      <GlassWater size={14} /> Spirit Archive
                    </h3>
                    <MenuModal venueId={venue.id} type="drink" />
                  </div>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {((venue.menu_drinks as MenuItem[]) || []).length > 0 ? (
                      (venue.menu_drinks as MenuItem[]).map((drink, i) => (
                        <div key={i} className="flex justify-between items-center bg-white/5 p-3 border border-white/5 hover:border-white/10 transition-all group/item">
                          <span className="text-xs font-light text-gray-300">{drink.name}</span>
                          <div className="flex gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                            <MenuModal venueId={venue.id} type="drink" initialData={drink} index={i} />
                            <DeleteMenuButton venueId={venue.id} type="drink" index={i} />
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-[9px] uppercase text-gray-700 italic">No spirits established</p>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}

          {venues.length === 0 && (
            <div className="text-center py-20 border border-dashed border-white/10">
              <p className="text-gray-500 font-serif italic text-lg">No legacies found in the local database.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}