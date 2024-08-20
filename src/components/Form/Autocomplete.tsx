"use client";

import { CAutocompleteProps } from "@app/models";
import { Autocomplete as DefaultAutocomplete, AutocompleteItem } from "@nextui-org/react";
import { useTranslations } from "next-intl";

/**
 * Custom Autocomplete
 */
export function Autocomplete(props: CAutocompleteProps) {
  // Translations
  const t = useTranslations('Placeholder');
  const tError = useTranslations('Error');

  // Handle change
  const handleChange = (e: any) => props.handleChange && props.handleChange({ target: { name: props.name, value: e } });

  return (!props.hidden &&
    <DefaultAutocomplete
      {...props}
      variant="faded"
      color="default"
      value={props?.controller}
      isDisabled={props.disabled}
      onSelectionChange={handleChange}
      aria-label={t(props?.placeholder)}
      placeholder={t(props?.placeholder)}
      errorMessage={tError(props?.errorMessage || 'invalidField')}
      startContent={props?.startContent}
      isClearable={props?.isClearable}
    >
      {props!.options!.map((option) => (
        <AutocompleteItem key={option.key}>{option.name}</AutocompleteItem>
      ))}
    </DefaultAutocomplete>
  )
}