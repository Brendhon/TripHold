"use client";

import { Trip } from "@app/models";
import { getIntlName } from "@utils/intl";
import { formatDate } from "@utils/dates";
import { useUserData } from "@utils/session";
import { Input, TripCard } from "components";
import { getTrips } from "lib/firebase/firestore/trip";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { searchInString } from "@utils/common";

export default function Home() {
  // States
  const [search, setSearch] = useState('') // Search
  const [trips, setTrips] = useState<Trip[]>([]) // Trips
  const [allTrips, setAllTrips] = useState<Trip[]>([]) // Trips

  // Router
  const router = useRouter();

  // Get locate
  const locate = useLocale();

  // Get user ID
  const user = useUserData();

  // Handle input change
  const handleChange = (e: any) => setSearch(e.target.value)

  // Filter by country name || alias || date
  const filterTrips = () => allTrips.filter(trip => {
    const foundName = searchInString(getIntlName(trip?.country, locate), search); // Search in country name
    const foundAlias = trip?.alias && searchInString(trip?.alias, search); // Search in alias
    const foundStartDate = trip?.startDate && formatDate(locate, trip!.startDate).includes(search); // Search in start date
    const foundEndDate = trip?.endDate && formatDate(locate, trip!.endDate).includes(search); // Search in end date
    return foundName || foundAlias || foundStartDate || foundEndDate;
  })

  // Use effect to listening search
  useEffect(() => setTrips(filterTrips()), [search])

  // Fetch trips
  useEffect(() => {
    getTrips(user.id!)
      .then(trips => {
        setTrips(trips)
        setAllTrips(trips)
      })
      .catch(error => console.error(error))
  }, [user.id])

  // Go to trip details
  const goToTrip = (trip: Trip) => router.push(`/trip/${trip.id}`);

  // Create new trip
  const createTrip = () => router.push('/trip/creation');

  // Render home page
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Input
          variant="bordered"
          className="md:w-4/5"
          classNames={{ inputWrapper: ["border-purple-semi-bold"] }}
          placeholder="search"
          type="search"
          handleChange={handleChange}
        />
      </div>

      <br />

      <div className="grid gap-8 p-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {!search && <TripCard key="new-card" onClick={createTrip} />}
        {trips!.map((trip) => <TripCard onClick={() => goToTrip(trip)} key={trip.id} className="bg-blue-medium" trip={trip} />)}
      </div>
    </>
  )
}