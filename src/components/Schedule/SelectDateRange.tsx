"use client";

import { TripDayRanges } from "@app/models";
import { Button } from "@nextui-org/react";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";

interface SelectGroupProps {
  ranges: TripDayRanges[];
  selectGroup: (group: TripDayRanges) => void;
}

/**
 * Trip Schedule
 */
export function SelectDateRange(props?: SelectGroupProps) {
  // State
  const [selectedRange, _setSelectedRange] = useState<TripDayRanges>();

  // Set selected group
  const setSelectedGroup = (group?: TripDayRanges) => {
    _setSelectedRange(group);
    if (group) props?.selectGroup(group);
  }

  // Locale
  const locale = useLocale();

  // Set selected group
  useEffect(() => setSelectedGroup(props?.ranges[0]), [props?.ranges]);

  // Get day title
  const getDayTitle = () => {
    // Get in format like as August 1 - September 1 2021
    const start = new Date(selectedRange!.startDate);

    // Get in format like as August 1 - September 1 2021
    const end = new Date(selectedRange!.endDate);

    // Check if are in the same month
    return start.getMonth() === end.getMonth()
      ? start.toLocaleDateString(locale, { day: 'numeric' }) + " - " + end.toLocaleDateString(locale, { day: 'numeric', month: 'long' })
      : start.toLocaleDateString(locale, { day: 'numeric', month: 'long' }) + " - " + end.toLocaleDateString(locale, { day: 'numeric', month: 'long' });
  }

  // Render
  return (
    selectedRange &&
    <div className="flex items-center w-full justify-center">
      <div className="flex items-center gap-4 mb-6 bg-grey-medium p-3 rounded-lg">
        <Button
          isIconOnly
          onClick={() => setSelectedGroup(props?.ranges[selectedRange!.id - 1])}
          isDisabled={selectedRange?.id === 0}>
          <IoMdArrowRoundBack size={24} />
        </Button>

        <span className="flex items-center text-xl md:text-2xl text-grey-extra-light">
          {getDayTitle()}
        </span>

        <Button
          isIconOnly
          onClick={() => setSelectedGroup(props?.ranges[selectedRange!.id + 1])}
          isDisabled={selectedRange?.id === props?.ranges.length! - 1}>
          <IoMdArrowRoundForward size={24} />
        </Button>
      </div>
    </div>
  )
}