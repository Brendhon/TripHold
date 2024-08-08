"use client";

import { signOut, useSession } from 'next-auth/react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Avatar
} from "@nextui-org/react";
import { getAvatarFromSession } from '@utils/Common';


export function ProfileDropdown() {
  const { data } = useSession();

  return (
    <Dropdown placement="bottom-end" radius="sm" aria-label='Profile Dropdown' backdrop='opaque' className='bg-blue-regular'>

      <DropdownTrigger aria-label='Profile Dropdown'>
        <Avatar
          size='lg'
          as="button"
          className="transition-transform border-purple-semi-bold border-2"
          src={getAvatarFromSession()}
        />
      </DropdownTrigger>

      <DropdownMenu aria-label="Profile Actions" variant="flat">

        <DropdownSection aria-label="Profile">
          <DropdownItem key="profile" textValue="profile" isReadOnly className="h-24 gap-2"
          >
            <div className="flex flex-col justify-center items-center text-center h-24 gap-2">
              <Avatar
                size='lg'
                src={getAvatarFromSession()}
              />
              <p className="font-semibold text-lg">{data?.user?.name}</p>
            </div>
          </DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label="Settings" showDivider>
          <DropdownItem key="configurations" textValue="settings" color='primary'>Configurations</DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label="Preferences">
          <DropdownItem textValue='logout' onClick={() => signOut({ callbackUrl: "/" })} key="logout" color="warning">
            Log Out
          </DropdownItem>
        </DropdownSection>

      </DropdownMenu>

    </Dropdown>
  )
}
