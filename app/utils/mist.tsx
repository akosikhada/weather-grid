/**
 * Converts temperature from Kelvin to Celsius
 * @param {number} kelvin - Temperature in Kelvin from OpenWeatherMap API
 * @returns {number} Temperature in Celsius (rounded to nearest integer)
 */

export const kelvinToCelsius = (kelvin: number) => {
  return Math.round(kelvin - 273.15);
};

/**
 * Converts Unix timestamp to local time format based on timezone offset
 * @param {number} unixTime - Unix timestamp in seconds
 * @param {number} timezoneOffset - Timezone offset in seconds from UTC
 * @returns {string} Formatted time string in 12-hour format with AM/PM (hh:mm AM/PM)
 */

export const unixToLocalTime = (
  unixTime: number,
  timezoneOffset: number,
): string => {
  const date = new Date((unixTime + timezoneOffset) * 1000);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");

  // Convert to 12-hour format with AM/PM
  const period = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12; // Convert 0 to 12 for midnight
  const hours12Padded = hours12.toString().padStart(2, "0"); // Ensure two digits

  return `${hours12Padded}:${minutes} ${period}`;
};

/**
 * Air Quality Index reference table
 *
 * Maps OpenWeatherMap API AQI values (1-5 scale) to:
 * - rating: The maximum value in a 0-100 scale for UI display
 * - description: Clear, actionable description of air quality level with specific health implications
 *
 * The AQI scale follows these ranges:
 * - 1 (0-20): Excellent/Good
 * - 2 (21-40): Fair
 * - 3 (41-60): Moderate
 * - 4 (61-80): Poor
 * - 5 (81-100): Very Poor/Hazardous
 */

export const airQualityIndex = [
  {
    rating: 20,
    description: "Excellent - Clean air with no health risks.",
  },
  {
    rating: 40,
    description: "Fair - Good air quality with minimal concerns.",
  },
  {
    rating: 60,
    description: "Moderate - May affect sensitive individuals.",
  },
  {
    rating: 80,
    description: "Poor - Health effects possible for everyone.",
  },
  {
    rating: 100,
    description: "Hazardous - Serious health risks, avoid outdoor activities.",
  },
];

/**
 * Formats large numbers into human-readable format with K/M suffixes
 *
 * This utility function converts numbers into abbreviated forms:
 * - Numbers over 1 million are shown as "X.XM" (e.g., 1,500,000 → 1.5M)
 * - Numbers over 1 thousand are shown as "X.XK" (e.g., 1,500 → 1.5K)
 * - Smaller numbers are returned as-is
 *
 * Used for displaying large numbers (like population) in a compact, readable format
 *
 * @param {number} num - The number to format
 * @returns {string|number} Formatted string with suffix or original number
 */

export const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return num;
  }
};
