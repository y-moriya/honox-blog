import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getViewTransitionStyles(name: string | undefined) {
  if (!name) return {};
  return {
    title: `view-transition-name:title-${name}`,
    description: `view-transition-name:description-${name}`,
    category: `view-transition-name:category-${name}`,
    date: `view-transition-name:date-${name}`,
  };
}

