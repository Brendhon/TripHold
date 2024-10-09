"use client";

import { Activity, Trip, TripDayRange } from "@app/models";
import { formatDate, getDate, getDayName, getTimeFormat } from "@utils/dates";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { PlusButton } from "./PlusButton";
import { Button, Spinner } from "@nextui-org/react";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import { getActivities } from "lib/firebase/firestore/activity";
import { ActivityScheduleDetail } from "components/Activity";

interface ScheduleDetailsProps {
  trip: Trip | null;
  ranges: TripDayRange[];
  createActivity: (day: Date, time: string) => void;
}

interface TimeType {
  24: string;
  12: string;
}

/**
 * Trip Schedule
 */
export function ScheduleDetails(props?: ScheduleDetailsProps) {
  // State
  const [activities, setActivities] = useState<Activity[]>([]);
  const [days, setDays] = useState<Date[]>([]);
  const [times, setTimes] = useState<TimeType[]>([]);
  const [selectedRange, setSelectedRange] = useState<TripDayRange>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Locale
  const locale = useLocale();

  // Set selected range when ranges change
  useEffect(() => {
    // Get trip ID
    const tripId = props?.trip?.id;

    // Check if trip ID is set
    if (!tripId) return;

    // Get activities
    getActivities(tripId).then(activities => {
      console.log(activities);
      setActivities(activities);
      setSelectedRange(props?.ranges[0]);
    });
  }, [props?.ranges]);

  // Set days and times when selected range changes
  useEffect(() => setDaysAndTimes(), [selectedRange]);

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
      times.push({ 24: time, 12: getTimeFormat(locale, time) });
    }

    // Set days
    setDays(days);

    // Set times
    setTimes(times);

    // Set loading
    setIsLoading(days.length === 0 || times.length === 0);
  }

  // Get formatted date
  const getFormattedDate = (date: DateType) => formatDate(locale, date, false)
  const getDayFormattedName = (date: DateType) => getDayName(date, locale);

  // Get selected start and end date
  const getSelectedStart = () => new Date(selectedRange?.startDate);
  const getSelectedEnd = () => new Date(selectedRange?.endDate);

  // Container
  const Container = ({ children, className }: any) => (
    <div className={`flex bg-grey-regular rounded-t-md gap-[1px] w-full ${className}`}>
      {children}
    </div>
  )

  // Get time in format (12 or 24 hours)
  const getTimeInLocale = (time: TimeType) => locale === 'en' ? time[12] : time[24];

  // Check if is clickable
  const isValid = (day: Date) => {
    if (!day) return true;
    const start = getDate(props?.trip?.startDate);
    const end = getDate(props?.trip?.endDate);
    if (!start || !end) return false;
    return day >= start && day <= end
  }
  // Check if has activity on day and time
  const hasActivity = (day: Date, time: string) => !!getActivityByDay(day, time);

  // Get activity on day and time
  const getActivityByDay = (day: Date, time: string) => {
    // Check if day and time is set
    if (!day || !time) return;

    // Get date
    return activities.find(activity => {
      // Get activity start date
      const activityStartDate = getDate(activity.startDate);

      // Get activity end date
      const activityEndDate = getDate(activity.endDate);

      // Check if activity has start and end date
      if (!activityStartDate || !activityEndDate) return false;

      // Form date
      const date = new Date(day);

      // Set time
      const times = time.split(':');

      // Set time to date
      date.setHours(parseInt(times[0]));
      date.setMinutes(parseInt(times[1]));

      // Check if day and time is between activity start and end date
      return date >= activityStartDate && date <= activityEndDate;
    });
  }

  // Content
  const Content = ({ children, className, day, clickable, small, padding }: any) => (
    <div className={`
        flex 
        items-center
        justify-center
        p-${padding ? padding : '2'}
        ${className} 
        ${small ? 'min-w-28' : 'w-full min-w-36 md:min-w-48'}
        ${clickable ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}
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

  // Render
  return (!isLoading &&
    <div className="flex flex-col bg-grey-regular rounded-md gap-[1px] overflow-x-auto border border-grey-regular">
      {/* Colum */}
      <Container>
        {/* Empty */}
        <Content className="flex-col w-10" small={true}>
          {props?.ranges.length! > 1 &&
            <div className={`flex items-center gap-4 justify-between bg-grey-medium p-3 rounded-md`}>

              {/* Back button */}
              <Button
                isIconOnly
                size="sm"
                onClick={() => setSelectedRange(props?.ranges[selectedRange!.id - 1])}
                isDisabled={selectedRange?.id === 0}>
                <IoMdArrowRoundBack size={20} />
              </Button>

              {/* Next button */}
              <Button
                isIconOnly
                size="sm"
                onClick={() => setSelectedRange(props?.ranges[selectedRange!.id + 1])}
                isDisabled={selectedRange?.id === props?.ranges.length! - 1}>
                <IoMdArrowRoundForward size={20} />
              </Button>
            </div>
          }
        </Content>

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
              <Text> {getTimeInLocale(time)} </Text>
            </Content>
            {Array.from({ length: 7 }, (_, i) => i).map((day) => (
              <Content key={day} day={days[day]} time={time[24]} clickable={isValid(days[day])} padding="0">
                {
                  hasActivity(days[day], time[24])
                    ? <ActivityScheduleDetail
                      time={time[24]}
                      day={days[day]}
                      activity={getActivityByDay(days[day], time[24])!} />
                    : <PlusButton
                      createActivity={() => props?.createActivity(days[day], time[24])}
                      time={time[24]}
                      day={days[day]}
                      className={isValid(days[day]) ? 'visible' : 'hidden'}
                    />
                }
              </Content>
            ))}
          </Container>
        ))}
      </div>
    </div>
  )
}