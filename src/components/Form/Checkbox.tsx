"use client";

import { CCheckboxProps } from "@app/models";
import { Checkbox as DefaultCheckbox } from "@nextui-org/react";

/**
 * Custom Checkbox
 */
export function Checkbox(props: CCheckboxProps) {
  return (!props.hidden &&
    <DefaultCheckbox size="sm" color="primary" isDisabled={props.disabled} {...props} onChange={props.handleChange}>
      {props.children}
    </DefaultCheckbox>
  )
}