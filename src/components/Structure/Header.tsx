"use client";

import Image from 'next/image';
import { BiSolidRightArrow } from "react-icons/bi";
import { ProfileDropdown } from "../Common/ProfileDropdown";
import { HeaderProps } from '@app/models';

/**
 * Login button - Google
 */
export function Header(props?: HeaderProps) {
  return (
    <header className="flex justify-between items-center mb-8">
      <div>
        <Image src="/logo.svg" alt="Logo" priority width="0" height="0" style={{ width: "auto", height: "50px" }}
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