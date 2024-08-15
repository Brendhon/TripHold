"use client";

import { DateTimeFormatOptions } from "next-intl";

/**
 * Format date
 * @param {Date | string} date Date to format
 * @returns {string} Formatted date
 */
export const formatDate = (date: Date | string, locate: string): string => {
  // Get locate date
  const location = () => {
    switch (locate) {
      case 'en':
        return 'en-US';
      case 'es':
        return 'es-ES';
      default:
        return 'pt-BR';
    }
  }

  // Date options
  const options: DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  }

  // Format date
  return new Date(date).toLocaleDateString(location(), options);
}