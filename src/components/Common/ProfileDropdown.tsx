"use client";

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger
} from "@nextui-org/react";
import { useUserAvatar, useUserName } from '@utils/session';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { LangSelector } from './LangSelector';
import { useRouter } from "next/navigation";

export function ProfileDropdown() {
  // Get translations
  const t = useTranslations('ProfileDropdown');

  // Router
  const router = useRouter();

  // Get avatar from session
  const avatar = useUserAvatar();

  // Get user name from session
  const name = useUserName();

  // Render
  return (
    <Dropdown placement="bottom-end" radius="sm" aria-label='Profile Dropdown' backdrop='opaque'>

      <DropdownTrigger aria-label='Profile Dropdown'>
        <Avatar
          size='md'
          as="button"
          className="transition-transform border-purple-semi-bold border-1"
          src={avatar}
        />
      </DropdownTrigger>

      <DropdownMenu aria-label="Profile Actions" variant="flat">

        <DropdownSection aria-label="Profile">
          <DropdownItem key="profile" textValue="profile" isReadOnly className="h-24 gap-2"
          >
            <div className="flex flex-col justify-center items-center text-center h-24 gap-2 cursor-default">
              <Avatar size='lg' src={avatar} />
              <p className="font-semibold text-lg">{name}</p>
            </div>
          </DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label="Settings" showDivider>

          <DropdownItem
            isReadOnly
            key="theme"
            className="cursor-default"
            endContent={<LangSelector />}
          >
            {t('language')}
          </DropdownItem>

          <DropdownItem key="configurations" onClick={() => router.push('/profile')} textValue="settings" color='primary'>
            {t('settings')}
          </DropdownItem>

          <DropdownItem key="terms" onClick={() => router.push('/terms')} textValue="terms" color='primary'>
            {t('terms')}
          </DropdownItem>
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
