"use client";

import { Trip } from "@app/models";
import { getIntlName, searchInString } from "@utils/common";
import { useUserId } from "@utils/session";
import { Input, TripCard } from "components";
import { getTrips } from "lib/firebase/firestore/trip";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  const userId = useUserId();

  // Handle input change
  const handleChange = (e: any) => setSearch(e.target.value)

  // Filter by country name
  const filterTrips = () => allTrips.filter(trip => searchInString(getIntlName(trip?.country, locate), search))

  // Use effect to listening search
  useEffect(() => setTrips(filterTrips()), [search])

  // Fetch trips
  useEffect(() => {
    getTrips(userId)
      .then(trips => {
        setTrips(trips)
        setAllTrips(trips)
      })
      .catch(error => console.error(error))
  }, [userId])

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
        {!search && <TripCard onClick={() => router.push('/trip/creation')} />}
        {trips!.map((trip) => <TripCard key={trip.id} className="bg-blue-medium" trip={trip} />)}
      </div>
    </>
  )
}