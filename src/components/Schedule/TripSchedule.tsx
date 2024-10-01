"use client";

import { ActivityTransportType, ActivityType, TripDayRange, TripScheduleProps } from "@app/models";
import { getDate, getDaysRanges, getTimeFormat } from "@utils/dates";
import { useEffect, useState } from "react";
import { ScheduleDetails } from "./ScheduleDetails";
import { ScheduleHeader } from "./ScheduleHeader";
import { SelectActivityType } from "components/Activity";
import { useRouter } from "next/navigation";

/**
 * Trip Schedule
 */
export function TripSchedule(props?: TripScheduleProps) {
  // State
  const [startDate, _setStartDate] = useState<DateType>(null);
  const [endDate, _setEndDate] = useState<DateType>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>();

  // Ranges
  const [ranges, setRanges] = useState<TripDayRange[]>([]);
  const [selectedRange, setSelectedRange] = useState<TripDayRange>();

  // Set start and end date
  const setStartDate = (date: DateType) => _setStartDate(getDate(date));
  const setEndDate = (date: DateType) => _setEndDate(getDate(date));

  // Router
  const router = useRouter();

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

  // Click handler
  const createHandler = (day: Date, time: string) => {
    // Get date
    const date = new Date(day);

    // Get time
    const times = getTimeFormat('pt', time).split(':');

    // Set time to date
    date.setHours(parseInt(times[0]));
    date.setMinutes(parseInt(times[1]));

    // Set selected date
    setSelectedDate(date);

    // Show modal
    setShowModal(true);
  }

  // Handle activity creation
  const handleSubmit = (type: ActivityType, subType?: ActivityTransportType) => {
    // Check if selected date exists
    if (!selectedDate || !props?.trip) return;

    // Form path
    const path = `${props?.trip.id}/activity/${type}?date=${selectedDate.toISOString()}${subType ? `&type=${subType}` : ''}`;

    // Redirect to path
    router.push(path);
  }

  // Render
  return (selectedRange &&
    <>
      <ScheduleHeader clickHandler={() => createHandler(selectedRange.startDate, "00:00")} />
      <ScheduleDetails createActivity={createHandler} ranges={ranges} trip={props?.trip ?? null} />
      <SelectActivityType onSubmit={handleSubmit} isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}