'use client';

import { Trip } from '@app/models';
import { useTrip } from 'context/TripContext';
import { getTrip } from 'lib/firebase/firestore/trip';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function TripLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  // Flag context
  const { setTrip } = useTrip();

  // Router
  const router = useRouter();

  // Get trip by ID
  useEffect(() => {
    // Get trip by ID
    getTrip(params.id).then(handleSetTrip).catch(handleError)

    // Clean up when unmount
    return () => setTrip(null);
  }, [params.id])


  // Handle set trip
  const handleSetTrip = (trip: Trip | null) => {
    if (!trip) router.push("/404");
    setTrip(trip);
  }

  // Handle error
  const handleError = (error: any) => {
    console.error(error);
    router.push("/404");
  }

  return <> {children} </>;
}