"use client";

import { FormValidation } from "@app/models";
import { useEffect, useState } from "react";
import { testRegex } from "./regex";

/**
 * Validate form
 * @param {FormValidation[]} fields - Form fields
 * @param {any} form - Form data
 * @returns {{isValid : boolean; errors: string[]}} - Form validation
 */
export const isFormValid = <T>(fields: FormValidation<T>[], form: any): { isValid: boolean; errors: string[] } => {
  // Check if fields and form are valid
  if (!fields || !form) return { isValid: false, errors: [] };

  // Init validation
  let isValid = true;

  // Init errors
  const errors: string[] = [];

  // Check if all fields are valid
  fields
    .reverse()
    .forEach(field => {
      // Check if field is required
      if (field.required && !form[field.key]) {
        errors.push(`${field.key}.required`);
        isValid = false;
      }

      // Check if field has a pattern and match
      if (field.pattern && testRegex(field.pattern, form[field.key])) {
        errors.push(`${field.key}.pattern`);
        isValid = false;
      }

      // Check if field is equal to another field
      if (field.equal && form[field.key] !== form[field.equal]) {
        errors.push(`${field.key}.notMatch`);
        isValid = false;
      }
    });

  // Return if form is valid
  return { isValid, errors };
}

/**
 * Create form validator
 * @param {FormValidation[]} fields 
 * @returns {{validations: FormValidation[]}} - Form validations
 */
export const createValidator = <T>(fields: FormValidation<keyof T>[]): { validations: FormValidation<keyof T>[] } => ({ validations: fields });

/**
 * Create useState to form
 * @param {T} initialState - Initial state
 * @returns {any} - Form state
 */
export const useForm = <T>(initialState?: T): any => {
  const [form, setForm] = useState<Partial<T>>(initialState || {});
  return { form, setForm };
}

/**
 * Use debounce to delay the value
 * @param {string} value - Value to debounce
 * @param {number} delay - Delay to debounce
 * @returns {string} - Debounced value
 */
export const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}