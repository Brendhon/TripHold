"use client";

import { CSelectProps } from "@app/models";
import { Select as DefaultSelect, SelectItem } from "@nextui-org/react";
import { useTranslations } from "next-intl";

/**
 * Custom Select
 */
export function Select(props: CSelectProps) {
  // Translations
  const t = useTranslations('Placeholder');
  const tError = useTranslations('Error');

  return (
    <DefaultSelect
      {...props}
      variant="faded"
      color="default"
      isDisabled={props.disabled}
      onChange={props.handleChange}
      aria-label={t(props?.placeholder)}
      placeholder={t(props?.placeholder)}
      errorMessage={tError(props?.errorMessage || 'invalidField')}
      startContent={props?.startContent}
    >
      {props!.options!.map((option) => (
        <SelectItem key={option.key}>{option.name}</SelectItem>
      ))}
    </DefaultSelect>
  )
}