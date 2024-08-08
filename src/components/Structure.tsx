"use client";

import { SOCIAL_MEDIAS } from "@utils/common";
import { useTranslations } from "next-intl";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { NextUIProvider } from "@nextui-org/react";

/**
 * Structure
 * @param {React.PropsWithChildren<{}>} props - Props
 */
export function Structure({ children }: React.PropsWithChildren<{}>) {
  // Open link
  const openLink = (type: ("github" | "linkedin")) => window.open(SOCIAL_MEDIAS[type]);

  // Translations
  const t = useTranslations('Footer');

  return (
    <NextUIProvider className="p-7 pb-10 h-screen relative">
      {children}

      <footer className="absolute bottom-0 right-0 flex justify-between items-center w-screen px-7 py-4">
        <span className="text-grey-extra-light">© 2024 Brendhon Moreira | {t('text')} </span>

        <div className="flex gap-4 ">
          <FaLinkedin className="text-grey-extra-light cursor-pointer" onClick={() => openLink("linkedin")} />
          <FaGithub className="text-grey-extra-light cursor-pointer" onClick={() => openLink("github")} />
        </div>
      </footer>

    </NextUIProvider>
  )
}