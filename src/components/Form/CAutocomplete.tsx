"use client";

import { CAutocompleteProps } from "@app/models";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useTranslations } from "next-intl";

/**
 * Autocomplete
 */
export function CAutocomplete(props: CAutocompleteProps) {
  // Translations
  const t = useTranslations('Placeholder');
  const tError = useTranslations('Error');

  // Handle change
  const handleChange = (e: any) => props.handleChange && props.handleChange({ target: { name: props.name, value: e } });

  return (
    <Autocomplete
      {...props}
      variant="faded"
      color="default"
      isDisabled={props.disabled}
      onSelectionChange={handleChange}
      aria-label={t(props?.placeholder)}
      placeholder={t(props?.placeholder)}
      errorMessage={tError(props?.errorMessage || 'invalidField')}
      startContent={props?.startContent}
    >
      {props!.options!.map((option) => (
        <AutocompleteItem key={option.key}>{option.name}</AutocompleteItem>
      ))}
    </Autocomplete>
  )
}