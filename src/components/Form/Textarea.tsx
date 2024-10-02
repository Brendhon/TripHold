"use client";

import { CTextareaProps } from "@app/models";
import { Textarea as DefaultTextarea } from "@nextui-org/react";
import { useTranslations } from "next-intl";

/**
 * Custom Input
 */
export function Textarea(props: CTextareaProps) {
  // Translations
  const t = useTranslations('Placeholder');

  // Error translations
  const tError = useTranslations('Error');

  return (!props.hidden &&
    <DefaultTextarea
      variant="bordered"
      color="default"
      {...props}
      isDisabled={props.disabled}
      value={props?.controller}
      startContent={props?.startContent}
      onChange={props.handleChange}
      errorMessage={tError(props?.errorMessage || 'invalidField')}
      placeholder={t(props?.placeholder)}
    />)
}