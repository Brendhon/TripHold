"use client";

import { CCheckboxProps } from "@app/models";
import { Checkbox } from "@nextui-org/react";

/**
 * Custom Input
 */
export function CCheckbox(props: CCheckboxProps) {
  return (
    <Checkbox size="sm" color="primary" {...props} onChange={props.handleChange}>
      {props.children}
    </Checkbox>
  )
}