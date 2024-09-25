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
          <div className="flex items-center ml-2 md:ml-4 gap-2 md:gap-4">
            <BiSolidRightArrow />
            <Image
              onClick={() => router.push(`/trip/${trip?.id}`)}
              src={trip?.country.flag}
              alt="Country Flag"
              className='h-8 md:h-12 cursor-pointer hover:opacity-80'
              width="0"
              height="0"
              style={{ width: "auto" }}
            />
          </div>
        }
      </div>

      {!props?.hideProfile ? <ProfileDropdown /> : <div />}
    </header>
  )
}