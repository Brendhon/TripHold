"use client";

import { Airport } from '@app/models';
import { BiSolidPlaneAlt } from 'react-icons/bi';

interface PlaneContentProps {
  airport: Airport;
  props?: any;
  onClick?: any;
  onlyView?: boolean;
  hideIcon?: boolean;
}

export function PlaneContent({ airport, props, onClick, onlyView, hideIcon }: PlaneContentProps) {

  // Render
  return (
    <div
      key={airport.id + props?.type}
      onClick={onClick}
      className={
        `flex items-center py-2 px-4 gap-2 rounded-md ${props?.current?.id === airport.id ? "bg-blue-light" : ""} ${onlyView ? "cursor-default" : "hover:bg-blue-light cursor-pointer"}`
      }>

      {/* Icon */}
      { !hideIcon &&
        <div className='flex items-center justify-center w-8'>
          <BiSolidPlaneAlt className="text-xl text-grey-extra-light mr-3" />
        </div>
      }

      {/* Content */}
      <div className="flex-grow">
        <p className="font-semibold">{airport.municipality}, {airport.iso_country}</p>
        <p className="text-sm text-grey-light">
          {airport.name}
          {airport.iata_code ? ` (${airport.iata_code})` : ""} {/* Renderiza o código somente se ele existir */}
        </p>
      </div>
    </div>
  );
}
