import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { DATE_OPTIONS } from "./constants";
import slugify from "slugify";
import { randomUUID } from "crypto";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFormattedDate = (date?: string) =>
  (date ?? new Date()).toLocaleString(
    "en-US",
    DATE_OPTIONS as Intl.DateTimeFormatOptions,
  );
export const getRelativeTime = (date: Date | string) => {
  dayjs.extend(relativeTime);
  return dayjs(date).fromNow();
};

export const generateUsername = (name: string) => slugify(name) + randomUUID();

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number,
) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};
