"use client";

import { getTimeFormat } from "@utils/dates";
import { useUserData } from "@utils/session";
import {
  getAirportByName,
  getAirportsByCoordinates,
  getAirportsByMunicipality
} from "lib/airports/airports";
import { useState } from "react";
import { BsPlus } from "react-icons/bs";

interface PlusButtonProps {
  className: string;
  time: string;
  day: Date;
  createActivity: () => void;
}

/**
 * Trip Schedule
 */
export function PlusButton(props: PlusButtonProps) {
  // State
  const [isHovered, setIsHovered] = useState(false);

  // Render
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      onClick={props.createActivity}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <BsPlus
        size={24}
        className={`text-purple-semi-bold ${props.className} ${isHovered ? 'visible' : 'invisible'}`}
      />
    </div>
  )
}