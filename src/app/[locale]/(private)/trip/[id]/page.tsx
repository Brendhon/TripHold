"use client";

import { Trip } from "@app/models";
import { Tab, Tabs } from "@nextui-org/react";
import { useTrip } from "context/TripContext";
import { useTranslations } from "next-intl";
import { Key, useEffect, useState } from "react";

type TabsOptions = 'schedule' | 'settings';

export default function TripDetails() {
  const [selected, setSelected] = useState<TabsOptions>("schedule");
  const [localTrip, setLocalTrip] = useState<Trip | null>(null);

  // Flag context
  const { trip } = useTrip();

  // Translations
  const tPage = useTranslations("TripDetails");

  // Use effect to set local trip
  useEffect(() => setLocalTrip(trip), [trip]);

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
      <Tab key="schedule" title={tPage('title.schedule')} className="py-4 px-7 md:px-16">
        <span>Schedule {localTrip?.id}</span>
      </Tab>

      <Tab key="settings" title={tPage('title.settings')} className="py-4 px-7 md:px-16">
        <span>Settings {localTrip?.id}</span>
      </Tab>

    </Tabs>
  )
}