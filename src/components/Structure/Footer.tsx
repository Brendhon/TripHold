"use client";

import { SOCIAL_MEDIAS } from "@utils/common";
import { useTranslations } from "next-intl";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";

/**
 * Footer
 */
export function Footer() {
  // Open link
  const openLink = (type: ("github" | "linkedin")) => window.open(SOCIAL_MEDIAS[type]);

  // Translations
  const t = useTranslations('Footer');

  return (
    <footer className="flex justify-between items-center w-full py-4">
      <span className="text-grey-extra-light text-xs">© 2024 Brendhon Moreira | {t('text')} </span>

      <div className="flex gap-4 ">
        <FaLinkedin className="text-grey-extra-light cursor-pointer" onClick={() => openLink("linkedin")} />
        <FaGithub className="text-grey-extra-light cursor-pointer" onClick={() => openLink("github")} />
      </div>
    </footer>
  )
}