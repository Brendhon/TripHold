"use client";

import { getTimeFormat } from "@utils/dates";
import { getAirportByName, getAirportsByCoordinates, getAirportsByMunicipality } from "lib/airports/airports";
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

  // Get airports
  const getAirportsList = async () => {
    // My coordinates
    const latitude = -22.273770;
    const longitude = -46.164990;

    // Get airports
    getAirportsByCoordinates(latitude, longitude)
      .then((airports) => console.log(airports))
      .catch((error) => console.log(error));

  }

  // Search airport by name
  const searchAirport = async () => {
    // Get airports
    getAirportByName('São Paulo')
      .then((airports) => console.log(airports))
      .catch((error) => console.log(error));
  }

  // Search airport by getAirportsByMunicipality
  const searchAirportByMunicipality = async () => {
    // Get airports
    getAirportsByMunicipality('São Paulo')
      .then((airports) => console.log(airports))
      .catch((error) => console.log(error));
  }

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

    // Get airports
    getAirportsList();

    // Search airport
    searchAirport();

    // Search airport by municipality
    searchAirportByMunicipality();
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