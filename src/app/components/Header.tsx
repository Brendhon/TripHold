"use client";

import { BiSolidRightArrow } from "react-icons/bi";

import Image from 'next/image';
import { UserImage } from './UserImage';

interface Props {
  hideProfile?: boolean;
  countryFlag?: string;
}

/**
 * Login button - Google
 */
export function Header(props?: Props) {
  return (
    <header className="flex justify-between items-center">
      <div>
        <Image src="/Logo.png" alt="Logo" width={280} height={60} />
        {
          props?.countryFlag &&
          <div>
            <BiSolidRightArrow />
            <Image src={props.countryFlag} alt="Country Flag" width={50} height={50} />
          </div>
        }
      </div>

      {!props?.hideProfile ? <UserImage /> : <div />}
    </header>
  )
}