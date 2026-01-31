import prisma from "@/lib/prisma"; //
import { notFound } from "next/navigation"; //
import OnboardingForm from "@/app/onboarding/page"; // Adjust path to your form location

export default async function EditVenue({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  // Fetch the existing record to hydrate the form on the server
  const venue = await prisma.venue.findUnique({
    where: { slug: slug },
  });

  // If the venue doesn't exist, show the 404 page
  if (!venue) {
    notFound();
  }

  // Pass existing data as a prop to your form component
  // In Next.js, your OnboardingForm should be a 'use client' component to handle form state
  return (
    <OnboardingForm 
      initialData={JSON.parse(JSON.stringify(venue))} 
      isEditing={true} 
    />
  );
}