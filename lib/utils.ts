import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const shortenAddress = (str?: string | null, length = 6): string => {
  if (!str) {
    return "";
  } else {
    return `${str.slice(0, length)}...${str.slice(str.length - 4, str.length)}`;
  }
};
