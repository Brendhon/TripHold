"use client";

import { Activity, ActivityTransportType, ActivityType, FlightActivity, OthersTransportActivity, TransferActivity } from "@app/models";
import { ActivityIcon } from "../ActivityIcon";
import { getDate } from "@utils/dates";

interface Props {
  className?: string;
  activity: Activity;
  day: Date;
  time: string;
}

export function ScheduleContentTransport(props: Props) {
  // Check if is initial time for activity  
  const isInitialTimeForActivity = (day: Date, time: string, activity: Activity) => {
    // Get current date
    const currentDate = new Date(day);

    // Get time
    const [hours, minutes] = time.split(":").map(Number);

    // Set time to current date
    currentDate.setHours(hours, minutes, 0, 0);

    // Get activity date
    const activityTime = getDate(activity.startDate);

    // Check if activity time is valid
    if (!activityTime) return false;

    // Check if current date is equal or 30 minutes before activity date
    return Math.abs(currentDate.getTime() - activityTime.getTime()) < 1000 * 60 * 30; // 30 minutes
  }

  // Check if is final time for activity
  const isFinalTimeForActivity = (day: Date, time: string, activity: Activity) => {
    // Get current date
    const currentDate = new Date(day);

    // Get time
    const [hours, minutes] = time.split(":").map(Number);

    // Set time to current date
    currentDate.setHours(hours, minutes, 0, 0);

    // Get activity date
    const activityTime = getDate(activity.endDate);

    // Check if activity time is valid
    if (!activityTime) return false;

    // Check if current date is equal or 30 minutes after activity date
    return Math.abs(currentDate.getTime() - activityTime.getTime()) < 1000 * 60 * 30; // 30 minutes
  }

  // StartContent 
  const getStartMsgContent = () => {
    switch (props.activity.subType) {
      // Flight
      case ActivityTransportType.Flight:
        const flight = props.activity as FlightActivity;
        return flight.departure.name;

      // Transfer
      case ActivityTransportType.Transfer:
        const transfer = props.activity as TransferActivity;
        return transfer.departure.name;

      // Others
      default:
        const others = props.activity as OthersTransportActivity;
        return others.departure?.address_string;
    }
  }

  // EndContent
  const getEndMsgContent = () => {
    switch (props.activity.subType) {

      // Flight
      case ActivityTransportType.Flight:
        const flight = props.activity as FlightActivity;
        return flight.arrival.name;

      // Transfer
      case ActivityTransportType.Transfer:
        const transfer = props.activity as TransferActivity;
        return transfer.arrival.name;

      // Others
      default:
        const others = props.activity as OthersTransportActivity;
        return others.arrival?.address_string;
    }
  }

  // Get Content 
  const Content = ({ children }: any) => (
    <span className="flex items-center justify-center text-grey-extra-light my-2 text-sm text-center">
      {children}
    </span>
  )

  // Get activity details
  const getActivityDetails = () => {
    switch (true) {
      // Check if is initial time for activity
      case isInitialTimeForActivity(props.day, props.time, props.activity):
        return <Content> {getStartMsgContent()} </Content>

      // Check if is final time for activity
      case isFinalTimeForActivity(props.day, props.time, props.activity):
        return <Content> {getEndMsgContent()} </Content>

      // Default - Middle time for activity
      default:
        return <ActivityIcon
          size={18}
          type={ActivityType.Transport}
          subType={props.activity.subType}
        />
    }
  }

  // States
  return getActivityDetails();
}
