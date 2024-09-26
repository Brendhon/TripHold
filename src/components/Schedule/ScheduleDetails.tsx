"use client";

import { Trip, TripDayRange, TripScheduleProps } from "@app/models";
import { formatDate, getDate, getDayName, getTimeFormat } from "@utils/dates";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

interface ScheduleDetailsProps {
  trip: Trip | null;
  range: TripDayRange;
}

/**
 * Trip Schedule
 */
export function ScheduleDetails(props?: ScheduleDetailsProps) {
  // State
  const [activities, setActivities] = useState<any[]>([]);
  const [days, setDays] = useState<Date[]>([]);
  const [times, setTimes] = useState<string[]>([]);

  // Locale
  const locale = useLocale();

  // Update start and end date on trip change
  useEffect(() => setDaysAndTimes(), [props?.range]);

  // Set days and times
  const setDaysAndTimes = () => {
    // Get days
    const days = [];

    // Get times
    const interval = 30;
    const times = [];

    // Loop through days
    for (let date = getSelectedStart(); date <= getSelectedEnd(); date.setDate(date.getDate() + 1)) {
      days.push(new Date(date));
    }

    // Loop through times
    for (let i = 0; i < 24 * 60; i += interval) {
      const h = Math.floor(i / 60);
      const m = (i % 60);
      const time = `${h}:${m < 10 ? '0' : ''}${m}`
      times.push(getTimeFormat(locale, time));
    }

    // Set days
    setDays(days);

    // Set times
    setTimes(times);
  }

  // Get formatted date
  const getFormattedDate = (date: DateType) => formatDate(locale, date, false)
  const getDayFormattedName = (date: DateType) => getDayName(date, locale);

  // Get selected start and end date
  const getSelectedStart = () => new Date(props?.range.startDate);
  const getSelectedEnd = () => new Date(props?.range.endDate);

  // Container
  const Container = ({ children, className }: any) => (
    <div className={`flex bg-grey-regular rounded-t-md gap-[1px] w-full ${className}`}>
      {children}
    </div>
  )

  // Content
  const Content = ({ children, className, day, clickable, small }: any) => (
    <div className={`
      flex 
      items-center
      justify-center
      p-2 
      ${className} 
      ${small ? 'min-w-28' : 'w-full min-w-36 md:min-w-48'}
      ${clickable ? 'cursor-pointer hover:opacity-70' : 'cursor-default'}
      ${isValid(day) ? 'bg-grey-medium ' : 'bg-grey-extra-regular'}
      `}>
      {children}
    </div>
  )

  // Text
  const Text = ({ children, className }: any) => (
    <span className={`text-sm md:text-md text-grey-extra-light ${className}`}>
      {children}
    </span>
  )

  // Check if is clickable
  const isValid = (day: Date) => {
    if (!day) return true;
    const start = getDate(props?.trip?.startDate);
    const end = getDate(props?.trip?.endDate);
    if (!start || !end) return false;
    return day >= start && day <= end
  }

  // Render
  return (
    <div className="flex flex-col bg-grey-regular rounded-md gap-[1px] overflow-x-auto border border-grey-regular">
      {/* Colum */}
      <Container>
        {/* Empty */}
        <Content className="flex-col w-10" small={true} />

        {/* Days */}
        {days.map((day, index) => (
          <Content key={index} className="flex-col" day={day}>
            <Text> {getFormattedDate(day)} </Text>
            <span className="text-lg md:text-xl text-purple-semi-bold">
              {getDayFormattedName(day)}
            </span>
          </Content>
        ))}
      </Container>

      {/* Rows */}
      <div className="flex flex-col bg-grey-regular rounded-t-md gap-[1px]">
        {times.map((time, index) => (
          <Container key={index}>
            <Content key={time} small={true}>
              <Text> {time} </Text>
            </Content>
            {Array.from({ length: 7 }, (_, i) => i).map((day) => (
              <Content key={day} day={days[day]} clickable={isValid(days[day])}>
                <Text className={isValid(days[day]) ? 'visible' : 'hidden'}>
                  {days[day].toString()}
                </Text>
              </Content>
            ))}
          </Container>
        ))}
      </div>
    </div>
  )
}