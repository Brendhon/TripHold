"use client";

import { Trip } from "@app/models";
import { MockTrips } from "@utils/mocks";
import { AuthStructure, Input, TripCard } from "components";
import { useEffect, useState } from "react";

export default function Home() {
  // State for search
  const [search, setSearch] = useState('')

  // Trips
  const [trips, setTrips] = useState<Trip[]>([])

  // Handle input change
  const handleChange = (e: any) => setSearch(e.target.value)

  // Filter by country name
  const filterTrips = () => MockTrips.filter(trip => trip.country.name.toLowerCase().includes(search.toLowerCase()))

  // Use effect to listening search
  useEffect(() => setTrips(filterTrips()), [search])

  // Fetch trips
  useEffect(() => setTrips(MockTrips), [])

  // Render home page
  return (
    <AuthStructure>
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
        {!search && <TripCard />}
        {trips!.map((trip) => <TripCard key={trip.id} className="bg-blue-medium" trip={trip} />)}
      </div>
    </AuthStructure>
  )
}