"use client";

import { TripAdvisorActivitySearch } from '@app/models';
import { MdHotel } from 'react-icons/md';

interface PlaneContentProps {
  hotel: TripAdvisorActivitySearch;
  props?: any;
  onClick?: any;
  onlyView?: boolean;
  hideIcon?: boolean;
}

export function HotelContent({ hotel, props, onClick, onlyView, hideIcon }: PlaneContentProps) {

  // Render
  return (
    <div
      key={hotel.location_id}
      onClick={onClick}
      className={
        `flex items-center py-2 px-4 gap-2 rounded-md ${props?.current?.location_id === hotel.location_id ? "bg-blue-light" : ""} ${onlyView ? "cursor-default" : "hover:bg-blue-light cursor-pointer"}`
      }>

      {/* Icon */}
      {!hideIcon &&
        <div className='flex items-center justify-center w-8'>
          <MdHotel className="text-xl text-grey-extra-light mr-3" />
        </div>
      }

      {/* Content */}
      <div className="flex-grow">
        <p className="font-semibold">
          {hotel.name}
        </p>
        <p className="text-sm text-grey-light">
          {hotel.address_obj?.address_string}
        </p>
      </div>
    </div>
  );
}
