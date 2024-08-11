"use client";

import { useTranslations } from "next-intl";
import { SelectProps, Select, SelectItem } from "@nextui-org/react";

interface Props extends Partial<SelectProps> {
  placeholder: string;
  options?: { value: any, label: string }[];
}

/**
 * Custom Input
 */
export function CSelect(props: Props) {
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