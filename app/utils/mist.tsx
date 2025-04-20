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
    description:
      "Excellent (AQI 0-20): Air quality is ideal for most individuals. No health concerns",
  },
  {
    rating: 40,
    description:
      "Fair (AQI 21-40): Air quality is acceptable. Some pollutants may affect very sensitive individuals",
  },
  {
    rating: 60,
    description:
      "Moderate (AQI 41-60): Health concerns for sensitive groups. General public is less likely to be affected",
  },
  {
    rating: 80,
    description:
      "Poor (AQI 61-80): Everyone may begin to experience health effects. Sensitive groups may experience more serious effects",
  },
  {
    rating: 100,
    description:
      "Hazardous (AQI 81-100): Health alert - risk of health effects for everyone. Avoid outdoor activities",
  },
];
