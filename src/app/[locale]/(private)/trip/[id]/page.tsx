"use client";

import { Tab, Tabs } from "@nextui-org/react";
import { TripSchedule } from "components";
import { useTrip } from "context/TripContext";
import { useTranslations } from "next-intl";
import { Key, useState } from "react";

type TabsOptions = 'schedule' | 'settings';

export default function TripDetails() {
  const [selected, setSelected] = useState<TabsOptions>("schedule");

  // Trip context
  const { trip } = useTrip();

  // Translations
  const tPage = useTranslations("TripDetails");

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
      <Tab key="schedule" title={tPage('title.schedule')} className="py-4">
        <TripSchedule trip={trip} />
      </Tab>

      <Tab key="settings" title={tPage('title.settings')} className="py-4">
        <span>Settings {trip?.id}</span>
      </Tab>

    </Tabs>
  )
}