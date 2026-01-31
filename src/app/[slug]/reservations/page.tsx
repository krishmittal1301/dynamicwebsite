import ReservationsClient from "./reservationClient";
import { getVenueReservations, updateReservationStatus } from "./action";
import { notFound } from "next/navigation";


export default async function ReservationsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const venue = await getVenueReservations(slug);

  if (!venue) notFound();

  // Serialize the data for the Client Component
  const plainVenue = JSON.parse(JSON.stringify(venue));

  return <ReservationsClient venue={plainVenue} slug={slug} />;
}