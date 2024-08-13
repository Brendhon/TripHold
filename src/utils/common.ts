import { FormValidation } from "@app/models";
import { Session } from "next-auth";
import toast from "react-hot-toast";
import { testRegex } from "./regex";

export const SOCIAL_MEDIAS = {
  github: "https://github.com/Brendhon",
  linkedin: "https://www.linkedin.com/in/brendhon-moreira/"
}

export const DEFAULT_LOCALE = "pt";

export const LOCALES = ["pt", "en"];

export const BUTTON_COLORS = {
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

/**
 * Get avatar from session
 * @param {string} session - Image source
 * @returns Image source
 */
export const getAvatarFromSession = (session?: Session | null) => {
  switch (true) {
    // Get image from session
    case !!session?.user?.image:
      return session.user.image;

    // Default image
    default:
      return "/avatar.svg";
  }
}

/**
 * Validate form
 * @param {FormValidation[]} fields - Form fields
 * @param {any} form - Form data
 * @param {any} t - Translation function
 * @returns {boolean} - If form is valid
 */
export const isFormValid = (fields: FormValidation[], form: any, t: any): boolean => {
  // Init validation
  let isValid = true;

  // Check if all fields are valid
  fields.forEach(field => {
    if (field.required && !form[field.key]) {
      toast.error(t(`${field.key}.required`));
      isValid = false;
    }

    if (field.pattern && testRegex(field.pattern, form[field.key])) {
      toast.error(t(`${field.key}.pattern`));
      isValid = false;
    }

    if (field.equal && form[field.key] !== form[field.equal]) {
      toast.error(t(`${field.key}.notMatch`));
      isValid = false;
    }
  });

  // Return if form is valid
  return isValid;
}