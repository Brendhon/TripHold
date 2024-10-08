"use client";

import { TripAdvisorActivitySearch } from '@app/models';
import { Button } from '@nextui-org/react';
import { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { MdHotel } from 'react-icons/md';
import { ActivityModalDetails } from '../ActivityModalDetails';

interface PlaneContentProps {
  hotel: TripAdvisorActivitySearch;
  props?: any;
  onClick?: any;
  onlyView?: boolean;
  hideIcon?: boolean;
}

export function HotelContent({ hotel, props, onClick, onlyView, hideIcon }: PlaneContentProps) {
  // State
  const [showModal, setShowModal] = useState<boolean>(false);

  // Handle on submit
  const onSubmit = () => {
    setShowModal(false);
    onClick();
  }

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
      {
        <div className='flex justify-center text-center'>
          <Button
            size='md'
            variant='light'
            className='hover:border-2 border-grey-light rounded-full'
            isIconOnly
            onClick={() => setShowModal(true)}
            color='default'>
            <FaInfoCircle size={20} />
          </Button>
        </div>
      }

      <ActivityModalDetails onlyView={onlyView} id={hotel.location_id} isOpen={showModal} onClose={() => setShowModal(false)} onSubmit={onSubmit} />
    </div>
  );
}
