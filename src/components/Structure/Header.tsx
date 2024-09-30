"use client";

import Image from 'next/image';
import { BiSolidRightArrow } from "react-icons/bi";
import { ProfileDropdown } from "../Common/ProfileDropdown";
import { HeaderProps } from '@app/models';
import { useRouter } from 'next/navigation';
import { useTrip } from 'context/TripContext';

/**
 * Login button - Google
 */
export function Header(props?: HeaderProps) {
  // Flag context
  const { trip } = useTrip();

  // Router 
  const router = useRouter();

  // Handle logo click
  const handleLogoClick = () => props?.isLogoClickable && router.push('/home');

  // Clickable class
  const clickableClass = props?.isLogoClickable ? "cursor-pointer hover:opacity-80" : "";

  // Render
  return (
    <header className="flex justify-between items-center mb-8">
      <div className="flex items-center">
        <Image
          onClick={handleLogoClick}
          className={`${clickableClass} h-8 md:h-12`}
          src="/logo.svg"
          alt="Logo"
          priority
          width="0"
          height="0"
          style={{ width: "auto" }}
        />
        {
          trip?.country.flag &&
          <div className="flex items-center ml-2 md:ml-4 gap-6">

            {/* Arrow */}
            <BiSolidRightArrow />

            {/* Trip info */}
            <div className="flex flex-col items-center justify-center relative">

              {/* Country flag */}
              <Image
                onClick={() => router.push(`/trip/${trip?.id}`)}
                src={trip?.country.flag}
                alt="Country Flag"
                className='h-8 md:h-10 cursor-pointer hover:opacity-80'
                width="0"
                height="0"
                style={{ width: "auto" }}
              />

              {/* Trip alias */}
              <span className="w-32 md:w-36 text-[12px] md:text-[13px] absolute -bottom-7 text-center leading-3 text-grey-light">{trip?.alias}</span>
            </div>
          </div>
        }
      </div>

      {!props?.hideProfile ? <ProfileDropdown /> : <div />}
    </header>
  )
}