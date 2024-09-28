"use client";

import { getTimeFormat } from "@utils/dates";
import { getActivitiesPath } from "@utils/paths";
import { useTrip } from "context/TripContext";
import { useState } from "react";
import { BsPlus } from "react-icons/bs";

interface PlusButtonProps {
  className: string;
  time: string;
  day: Date;
}

/**
 * Trip Schedule
 */
export function PlusButton(props: PlusButtonProps) {
  // State
  const [isHovered, setIsHovered] = useState(false);

  // Trip
  const { trip } = useTrip();

  // Click handler
  const clickHandler = () => {
    const date = new Date(props.day);
    const time = getTimeFormat('pt', props.time).split(':');
    date.setHours(parseInt(time[0]));
    date.setMinutes(parseInt(time[1]));
    console.log('Add activity', date);
    
    fetch(getActivitiesPath('hotels') + `?place=Milan`, { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        console.log('Data:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  // Render
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      onClick={clickHandler}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <BsPlus
        size={24}
        className={`text-purple-semi-bold ${props.className} ${isHovered ? 'visible' : 'invisible'}`}
      />
    </div>
  )
}