"use client";

import toast from "react-hot-toast";

export const useSuccessNotifier = (t: any, message: string) => {
  // Notifier 
  toast.success(t(`success.${message}`));
}

export const useErrorNotifier = (t: any, message: string) => {
  // Notifier 
  toast.error(t(`error.${message}`));
}

export const useInfoNotifier = (t: any, message: string) => {
  // Notifier 
  toast(t(`info.${message}`));
}

