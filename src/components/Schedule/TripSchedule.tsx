"use client";

import { TripDayRange, TripScheduleProps } from "@app/models";
import { getDate, getDaysRanges } from "@utils/dates";
import { useEffect, useState } from "react";
import { ScheduleDetails } from "./ScheduleDetails";
import { ScheduleHeader } from "./ScheduleHeader";

/**
 * Trip Schedule
 */
export function TripSchedule(props?: TripScheduleProps) {
  // State
  const [startDate, _setStartDate] = useState<DateType>(null);
  const [endDate, _setEndDate] = useState<DateType>(null);

  // Ranges
  const [ranges, setRanges] = useState<TripDayRange[]>([]);
  const [selectedRange, setSelectedRange] = useState<TripDayRange>();

  // Set start and end date
  const setStartDate = (date: DateType) => _setStartDate(getDate(date));
  const setEndDate = (date: DateType) => _setEndDate(getDate(date));

  // Update start and end date on trip change
  useEffect(() => {
    setStartDate(props?.trip?.startDate);
    setEndDate(props?.trip?.endDate);
  }, [props?.trip]);

  // Update day group on start and end date change
  useEffect(() => {
    // Groups of days
    const groups = getDaysRanges(startDate, endDate);

    // Set day group
    setRanges(groups);
    setSelectedRange(groups[0]);
  }, [startDate, endDate]);

  // Render
  return (
    <>
      <ScheduleHeader />
      {selectedRange && <ScheduleDetails  ranges={ranges} trip={props?.trip ?? null} />}
    </>
  )
}