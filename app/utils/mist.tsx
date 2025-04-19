import moment from "moment";

export const kelvinToCelsius = (kelvin: number) => {
  return Math.round(kelvin - 273.15);
};

export const unixToLocalTime = (unixTime: number, timezone: number) => {
  return moment
    .unix(unixTime)
    .utcOffset(timezone / 60) // Convert timezone offset to minutes
    .format("hh:mm A"); // Format as 12-hour time with AM/PM
};

export const airQualityIndex = [
  {
    rating: 10,
    description:
      "Excellent: Pristine air quality, ideal for outdoor activities",
  },
  {
    rating: 20,
    description: "Very Good: Clean air with minimal pollutants",
  },
  {
    rating: 30,
    description: "Good: Satisfactory air quality with low health risk",
  },
  {
    rating: 40,
    description: "Fair: Acceptable air quality for most individuals",
  },
  {
    rating: 50,
    description:
      "Moderate: Air quality acceptable, but may affect sensitive individuals",
  },
  {
    rating: 60,
    description:
      "Below Average: Some pollutants present, sensitive groups may experience effects",
  },
  {
    rating: 70,
    description:
      "Poor: Health effects likely for sensitive groups and older adults",
  },
  {
    rating: 80,
    description: "Unhealthy: General population may experience health effects",
  },
  {
    rating: 90,
    description: "Very Unhealthy: Health alert - reduce outdoor exposure",
  },
  {
    rating: 100,
    description: "Hazardous: Serious health risk, avoid outdoor activities",
  },
];
