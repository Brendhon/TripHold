"use client";

interface Props {
  label?: string;
  type?: "decline" | "submit" | "button";
  action?: () => void;
}

/**
 * Button
 */
export function Button(props?: Props) {
  // Colors
  const colors = {
    "decline": {
      "bg": "bg-red-regular",
      "text": "text-grey"
    },
    "submit": {
      "bg": "bg-purple-semi-bold",
      "text": "text-grey-thin"
    },
    "button": {
      "bg": "bg-grey-thin",
      "text": "text-blue-regular"
    }
  }

  return (
    <button
      className={`px-8 py-2 min-w-32 h-12 rounded-md ${colors[props?.type ?? "button"].bg}`}
      onClick={() => props?.action ? props.action() : null}
    >
      <span className={`font-semibold text-base	${colors[props?.type ?? "button"].text}`}>{props?.label ?? "Button"}</span>
    </button>
  )
}