/**
 * Calculate years of professional experience from a start date
 * @param startDate - The date when professional experience began
 * @returns Number of years of experience (rounded to nearest integer)
 */
export function calculateYearsOfExperience(startDate: Date): number {
  const now = new Date();
  const diffInMs = now.getTime() - startDate.getTime();
  const diffInYears = diffInMs / (1000 * 60 * 60 * 24 * 365.25); // Account for leap years
  return Math.floor(diffInYears);
}

// Start date of professional experience: November 2015
export const CAREER_START_DATE = new Date(2015, 9, 1); // Month is 0-indexed, so 9 = October

/**
 * Get current years of experience
 */
export function getYearsOfExperience(): number {
  return calculateYearsOfExperience(CAREER_START_DATE);
}
