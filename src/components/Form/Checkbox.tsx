"use client";

import { CCheckboxProps } from "@app/models";
import { Checkbox as DefaultCheckbox } from "@nextui-org/react";

/**
 * Custom Checkbox
 */
export function Checkbox(props: CCheckboxProps) {
  return (
    <DefaultCheckbox size="sm" color="primary" {...props} onChange={props.handleChange}>
      {props.children}
    </DefaultCheckbox>
  )
}