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
  const tError = useTranslations('Error');

  return (
    <Select
      {...props}
      variant="faded"
      color="default"
      onChange={props.handleChange}
      aria-label={t(props?.placeholder)}
      placeholder={t(props?.placeholder)}
      errorMessage={tError(props?.errorMessage || 'invalidField')}
      startContent={props?.startContent}
    >
      {props!.options!.map((option) => (
        <SelectItem key={option.key}>{option.name}</SelectItem>
      ))}
    </Select>
  )
}