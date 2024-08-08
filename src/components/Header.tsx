"use client";

import Image from 'next/image';
import { BiSolidRightArrow } from "react-icons/bi";
import { ProfileDropdown } from "./ProfileDropdown";

interface Props {
  hideProfile?: boolean;
  countryFlag?: string;
}

/**
 * Login button - Google
 */
export function Header(props?: Props) {
  return (
    <header className="flex justify-between items-center mb-8">
      <div>
        <Image src="/Logo.png" alt="Logo" priority width={280} height={60} style={{ width: "280px", height: "60px" }}
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