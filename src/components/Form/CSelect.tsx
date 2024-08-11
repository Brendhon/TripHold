"use client";

import { useTranslations } from "next-intl";
import { Select, SelectItem } from "@nextui-org/react";
import { CSelectProps } from "@app/models";

/**
 * Custom Input
 */
export function CSelect(props: CSelectProps) {
  // Translations
  const t = useTranslations('Placeholder');

  return (
    <Select
      {...props}
      isRequired
      variant="faded"
      color="default"
      aria-label={t(props?.placeholder)}
      placeholder={t(props?.placeholder)}
      startContent={props?.startContent}
    >
      {props!.options!.map((option, index) => (
        <SelectItem key={index} value={option.value}>{option.label}</SelectItem>
      ))}
    </Select>
  )
}