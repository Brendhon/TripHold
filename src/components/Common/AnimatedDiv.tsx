"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  className?: string;
  children: ReactNode;
  speed?: (0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1);
}

/**
 * Animated Div
 */
export function AnimatedDiv(props: Props) {
  // Set default speed
  const defaultSpeed = 0.5;

  // Get speed
  const speed = props.speed ?? defaultSpeed;

  // Render
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: speed, ease: "easeInOut" }} className={props.className}>
      {props.children}
    </motion.div>
  )
}