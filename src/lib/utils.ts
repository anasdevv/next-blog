import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DATE_OPTIONS } from "./constants";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFormattedDate = (date?: string) =>
  (date ?? new Date()).toLocaleString(
    "en-US",
    DATE_OPTIONS as Intl.DateTimeFormatOptions,
  );
