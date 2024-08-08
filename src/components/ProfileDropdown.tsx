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
import { getAvatarFromSession } from '@utils/common';
import { useTranslations } from 'next-intl';


export function ProfileDropdown() {
  const { data } = useSession();
  const t = useTranslations('ProfileDropdown');

  return (
    <Dropdown placement="bottom-end" radius="sm" aria-label='Profile Dropdown' backdrop='opaque'>

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
            <div className="flex flex-col justify-center items-center text-center h-24 gap-2 cursor-default">
              <Avatar
                size='lg'
                src={getAvatarFromSession()}
              />
              <p className="font-semibold text-lg">{data?.user?.name}</p>
            </div>
          </DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label="Settings" showDivider>

          <DropdownItem
            isReadOnly
            key="theme"
            className="cursor-default"
            endContent={
              <select
                className="z-10 outline-none w-24 py-0.5 rounded-md text-tiny group-data-[hover=true]:border-default-500 border-grey-light dark:border-grey-light bg-blue-light text-grey-thin cursor-pointer"
                id="theme"
                name="theme"
              >
                <option>{t('portuguese')}</option>
                <option>{t('english')}</option>
                <option>{t('spanish')}</option>
              </select>
            }
          >
            {t('language')}
          </DropdownItem>

          <DropdownItem key="configurations" textValue="settings" color='primary'>{t('settings')}</DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label="Preferences">
          <DropdownItem textValue='logout' onClick={() => signOut({ callbackUrl: "/" })} key="logout" color="warning">
            {t('logout')}
          </DropdownItem>
        </DropdownSection>

      </DropdownMenu>

    </Dropdown>
  )
}
