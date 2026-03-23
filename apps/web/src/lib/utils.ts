import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBaseUrl(): string {
  const url = import.meta.env.VITE_BASE_URL || "https://opticasuarezjaen.es";
  return url.replace(/\/+$/, "");
}
