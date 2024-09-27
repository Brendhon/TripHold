"use client";

import { Button } from "@nextui-org/react";
import { getDateTitle } from "@utils/dates";
import { useTrip } from "context/TripContext";
import { useLocale, useTranslations } from "next-intl";

/**
 * Trip Schedule
 */
export function ScheduleHeader() {

  // Locale
  const locale = useLocale();

  // Trip
  const { trip } = useTrip();

  // Translations
  const t = useTranslations("TripDetails.schedule");

  // Handle add button click
  const handleAddClick = () => {
    console.log('Add button clicked');
  };

  // AddButton
  const AddButton = ({ className }: any) => (
    <Button
      variant="solid"
      size="lg"
      color="primary"
      className={`rounded-md ${className}`}
      onClick={() => handleAddClick()}>
      {t('add')}
    </Button>
  );

  // Render
  return (
    <div className="flex flex-col md:flex-row md:items-center w-full justify-between mb-6 gap-4">
      {/* Date Title */}
      <div className="flex flex-col items-center justify-center bg-grey-medium p-3 rounded-md text-grey-extra-light text-xl gap-2">
        <span>{getDateTitle(trip?.startDate, trip?.endDate, locale)}</span>
      </div>

      {/* Add button */}
      <AddButton />
    </div>
  )
}