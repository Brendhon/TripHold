"use client";

import Image from 'next/image';
import { BiSolidRightArrow } from "react-icons/bi";
import { ProfileDropdown } from "../Common/ProfileDropdown";
import { HeaderProps } from '@app/models';
import { useRouter } from 'next/navigation';

/**
 * Login button - Google
 */
export function Header(props?: HeaderProps) {
  // Router 
  const router = useRouter();

  // Handle logo click
  const handleLogoClick = () => props?.isLogoClickable && router.push('/home');

  // Clickable class
  const clickableClass = props?.isLogoClickable ? "cursor-pointer hover:opacity-80" : "";

  // Render
  return (
    <header className="flex justify-between items-center mb-8">
      <div>
        <Image
          onClick={handleLogoClick}
          className={clickableClass}
          src="/logo.svg"
          alt="Logo"
          priority
          width="0"
          height="0"
          style={{ width: "auto", height: "50px" }}
        />
        {
          props?.countryFlag &&
          <div>
            <BiSolidRightArrow />
            <Image src={props.countryFlag} alt="Country Flag" width={50} height={50} />
          </div>
        }
      </div>

      {!props?.hideProfile ? <ProfileDropdown /> : <div />}
    </header>
  )
}