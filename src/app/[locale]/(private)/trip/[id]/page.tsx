"use client";

import { Trip } from "@app/models";
import { Tab, Tabs } from "@nextui-org/react";
import { useFlag } from "context/FlagContext";
import { getTrip } from "lib/firebase/firestore/trip";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Key, useEffect, useState } from "react";

type TabsOptions = 'schedule' | 'settings';

export default function TripDetails({ params }: { params: { id: string } }) {
  // States
  const [trip, setTrip] = useState<Trip | null>(null);
  const [selected, setSelected] = useState<TabsOptions>("schedule");

  // Flag context
  const { setFlagUrl } = useFlag();

  // Router
  const router = useRouter();

  // Locate
  const locate = useLocale();

  // Translations
  const tPage = useTranslations("TripDetails");

  // Get trip by ID
  useEffect(() => {
    // Get trip by ID
    getTrip(params.id).then(handleSetTrip).catch(handleError)

    // Clean up when unmount
    return () => setFlagUrl('');
  }, [params.id])

  // Handle set trip
  const handleSetTrip = (trip: Trip | null) => {
    if (!trip) router.push("/404");
    setTrip(trip);
    setFlagUrl(trip?.country.flag ?? '');
  }

  // Handle error
  const handleError = (error: any) => {
    console.error(error);
    router.push("/404");
  }

  // Render home page
  return (
    <Tabs
      size="lg"
      variant="underlined"
      color="secondary"
      aria-label="Tabs form"
      selectedKey={selected}
      onSelectionChange={(key: Key) => setSelected(key as TabsOptions)}
    >
      <Tab key="schedule" title={tPage('title.schedule')} className="py-4 px-16">
        <span>Schedule</span>
      </Tab>

      <Tab key="settings" title={tPage('title.settings')} className="py-4 px-16">
        <span>Settings</span>
      </Tab>

    </Tabs>
  )
}