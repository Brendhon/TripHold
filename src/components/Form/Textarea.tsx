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
      classNames={{ input: ["placeholder:text-grey-light"] }}
      {...props}
      isDisabled={props.disabled}
      aria-label={t(props?.placeholder)}
      value={props?.controller}
      startContent={props?.startContent}
      onChange={props.handleChange}
      errorMessage={tError(props?.errorMessage || 'invalidField')}
      placeholder={t(props?.placeholder)}
    />)
}