"use client";

import { getTimeFormat } from "@utils/dates";
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

  // Click handler
  const clickHandler = () => {
    // Get date
    const date = new Date(props.day);

    // Get time
    const time = getTimeFormat('pt', props.time).split(':');

    // Set time to date
    date.setHours(parseInt(time[0]));
    date.setMinutes(parseInt(time[1]));

    // Log
    console.log('Add activity', date);
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