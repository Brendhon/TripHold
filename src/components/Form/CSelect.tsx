"use client";

import { CSelectProps } from "@app/models";
import { Select, SelectItem } from "@nextui-org/react";
import { useTranslations } from "next-intl";

/**
 * Custom Input
 */
export function CSelect(props: CSelectProps) {
  // Translations
  const t = useTranslations('Placeholder');

  return (
    <Select
      {...props}
      variant="faded"
      color="default"
      aria-label={t(props?.placeholder)}
      placeholder={t(props?.placeholder)}
      startContent={props?.startContent}
    >
      {props!.options!.map((option) => (
        <SelectItem key={option.value}>{option.label}</SelectItem>
      ))}
    </Select>
  )
}