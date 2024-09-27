"use client";

import { TripDayRange } from "@app/models";
import { Timestamp } from "firebase/firestore";
import { DateTimeFormatOptions } from "next-intl";

/**
 * Get date 
 * @param {Date | string | Timestamp} date Date to get
 * @returns {Date} Date object
 */
export const getDate = (date: DateType): Date | null => {
  // Check if date is valid
  if (!date) return null;

  // Check if date is firestore Timestamp and convert to date
  if (date instanceof Timestamp) date = date.toDate();

  // Return date
  return new Date(date);
}

/**
 * Format date
 * @param {string} locate Locale
 * @param {Date | string} date Date to format
 * @param {boolean} full Full date (with year)
 * @returns {string} Formatted date
 */
export const formatDate = (locate: string, date: DateType, full: boolean = true): string => {
  // Get date
  date = getDate(date);

  // Check if date is valid
  if (!date) return "";

  // Date options
  const options: DateTimeFormatOptions = {
    month: "numeric",
    day: "numeric"
  }

  // Add year
  if (full) options.year = "numeric";

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

/**
 * Get day name
 * @param {DateType} date Trip date
 * @param {string} locale Locale
 * @returns {string} Day name 
 */
export const getDayName = (date: DateType, locale: string = 'en'): string => {
  // Get day name
  const dayName = getDate(date)?.toLocaleDateString(locale, { weekday: 'long' });

  // Check if day name is valid
  if (!dayName) return "";

  // Return day name
  return dayName.charAt(0).toUpperCase() + dayName.slice(1);
}

/**
 * Get days difference between two dates
 * @param {DateType} date1 First date
 * @param {DateType} date2 Second date
 */
export const getDaysDifference = (date1: DateType, date2: DateType): number => {
  // Get dates
  const d1 = getDate(date1);
  const d2 = getDate(date2);

  // Check if dates are valid
  if (!d1 || !d2) return 0;

  // Calculate difference
  const diff = d2.getTime() - d1.getTime();

  // Return difference in days
  return diff / (1000 * 60 * 60 * 24);
}

/**
 * Get days ranges
 * @param {DateType} startDate Start date
 * @param {DateType} endDate End date
 * @returns {TripDayRange[]} Days ranges
 */
export const getDaysRanges = (startDate: DateType, endDate: DateType): TripDayRange[] => {
  // Difference
  const diff = getDaysDifference(startDate, endDate);

  // Groups of days
  let groups: TripDayRange[] = [];

  // Slipt days in groups of 7
  const groupsNumber = Math.ceil(diff / 7);

  // Loop groups
  for (let id = 0; id < groupsNumber; id++) {
    // Start date
    const start = new Date(startDate);
    start.setDate(start.getDate() + (id * 7));

    // End date
    const end = new Date(start);
    end.setDate(end.getDate() + 6);

    // Add group
    groups.push({
      id,
      startDate: start,
      endDate: end
    });
  }

  // Return groups
  return groups;
}

/**
 * Get time in format (12 or 24 hours)
 * @param {string} locale Locale
 * @param {string} time Time to format
 * @returns {string} Formatted time
 */
export const getTimeFormat = (locale: string, time: string): string => {
  // Check if time is valid
  if (!time) return "";

  // Get time
  const [h, m] = time.split(':');

  // Return time
  return new Date(0, 0, 0, +h, +m).toLocaleTimeString(getLocaleDate(locale), { hour: '2-digit', minute: '2-digit' });
}

/**
 * Get date title
 * @param {Date} startDate Start date
 * @param {Date} endDate End date
 * @param {string} locale Locale
 * @returns {string} Date title
 */
export const getDateTitle = (startDate: Date, endDate: Date, locale: string): string => {
  // Get in format like as August 1 - September 1 2021
  const start = getDate(startDate);
  
  // Get in format like as August 1 - September 1 2021
  const end = getDate(endDate);

  // Check if dates are valid
  if (!start || !end) return "";

  // Check if are in the same month
  return start.getMonth() === end.getMonth()
    ? start.toLocaleDateString(locale, { day: 'numeric' }) + " - " + end.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
    : start.toLocaleDateString(locale, { day: 'numeric', month: 'long' }) + " - " + end.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
}