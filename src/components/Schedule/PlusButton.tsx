"use client";

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
    console.log('Add activity', props.time, props.day);
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