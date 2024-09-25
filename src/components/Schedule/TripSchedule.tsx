"use client";

import { TripDayRanges, TripScheduleProps } from "@app/models";
import { formatDate, getDate, getDayName, getDaysRanges } from "@utils/dates";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { SelectDateRange } from "./SelectDateRange";

/**
 * Trip Schedule
 */
export function TripSchedule(props?: TripScheduleProps) {
  // State
  const [startDate, _setStartDate] = useState<DateType>(null);
  const [endDate, _setEndDate] = useState<DateType>(null);

  // Ranges
  const [ranges, setRanges] = useState<TripDayRanges[]>([]);
  const [selectedRange, setSelectedRange] = useState<TripDayRanges>();

  // Locale
  const locale = useLocale();

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

  // Get formatted date
  const getFormattedDate = (date: DateType) => formatDate(locale, date);
  const getDayFormattedName = (date: DateType) => getDayName(date, locale);

  // Get selected start and end date
  const getSelectedStart = () => new Date(selectedRange?.startDate);
  const getSelectedEnd = () => new Date(selectedRange?.endDate);

  // Render
  return (
    <>
      <SelectDateRange ranges={ranges} selectGroup={setSelectedRange} />
      <h1>Day Group</h1>
      <h1>Start {getFormattedDate(getSelectedStart())} ({getDayFormattedName(getSelectedStart())})</h1>
      <h1>End {getFormattedDate(getSelectedEnd())} ({getDayFormattedName(getSelectedEnd())})</h1>
    </>
  )
}