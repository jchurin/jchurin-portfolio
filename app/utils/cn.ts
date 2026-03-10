import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names using clsx and merges Tailwind classes intelligently
 * @param inputs - Class names, objects, or arrays to combine
 * @returns Merged and deduplicated class string
 * @example
 * cn('px-2 py-1', someCondition && 'bg-primary', { 'text-white': isActive })
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
