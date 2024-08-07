"use client";

import { BUTTON_COLORS } from "@utils/Common";

interface Props {
  label?: string;
  type?: "decline" | "submit" | "button";
  action?: () => void;
}

/**
 * Button
 */
export function Button(props?: Props) {
  return (
    <button
      className={`px-8 py-2 min-w-32 h-12 rounded-md ${BUTTON_COLORS[props?.type ?? "button"].bg}`}
      onClick={() => props?.action ? props.action() : null}
    >
      <span className={`font-semibold text-base	${BUTTON_COLORS[props?.type ?? "button"].text}`}>{props?.label ?? "Button"}</span>
    </button>
  )
}