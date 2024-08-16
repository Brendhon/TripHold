"use client";

import { Timestamp } from "firebase/firestore";
import { DateTimeFormatOptions } from "next-intl";

/**
 * Get date 
 * @param {Date | string | Timestamp} date Date to get
 * @returns {Date} Date object
 */
export const getDate = (date?: Date | string | Timestamp): Date | undefined => {
  // Check if date is valid
  if (!date) return;

  // Check if date is firestore Timestamp and convert to date
  if (date instanceof Timestamp) date = date.toDate();

  // Return date
  return new Date(date);
}

/**
 * Format date
 * @param {Date | string} date Date to format
 * @returns {string} Formatted date
 */
export const formatDate = (locate: string, date?: Date | string): string => {
  // Get date
  date = getDate(date);
  
  // Check if date is valid
  if (!date) return "";

  // Date options
  const options: DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  }

  // Format date
  return new Date(date).toLocaleDateString(getLocaleDate(locate), options);
}

/**
 * Get locale date
 * @param {string} locale - Locale
 * @returns {string} Locale date
 */
export const getLocaleDate = (locale: string): string => {
  switch (locale) {
    case "pt":
      return "pt-BR";
    case "es":
      return "es-ES";
    default:
      return "en-US";
  }
}

/**
 * Get date format for locale
 * @param {string} locale - Locale
 * @param {boolean} time - Include time
 * @returns {string} Date format
 */
export const getDateFormat = (locale: string, time: boolean = false): string => {
  switch (locale) {
    case "pt":
      return "dd/MM/yyyy" + (time ? " HH:mm" : "");
    case "es":
      return "dd/MM/yyyy" + (time ? " HH:mm" : "");
    default:
      return "M/d/yyyy" + (time ? " h:mm a" : "");
  }
}