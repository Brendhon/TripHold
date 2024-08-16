"use client";

import toast from "react-hot-toast";

export const showSuccessNotifier = (t: any, message: string) => {
  // Notifier 
  toast.success(t(`success.${message}`));
}

export const showErrorNotifier = (t: any, message: string) => {
  // Notifier 
  toast.error(t(`error.${message}`));
}

export const showInfoNotifier = (t: any, message: string) => {
  // Notifier 
  toast(t(`info.${message}`));
}

