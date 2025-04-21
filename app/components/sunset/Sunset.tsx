"use client";

import { useGlobalContext } from "@/app/context/global-context";
import { sunrise, sunset } from "@/app/utils/icons";
import { unixToLocalTime } from "@/app/utils/mist";
import React from "react";

/**
 * Sunset/Sunrise Component
 *
 * Displays the current day's sunset and sunrise times with icons in a clean layout.
 *
 * Features:
 * - Shows sunset and sunrise times in local time format (hh:mm AM/PM)
 * - Converts Unix timestamps to local times using timezone offsets
 * - Uses dedicated icons for visual clarity
 * - Handles loading, error, and empty data states appropriately
 *
 * Implementation notes:
 * - Times are provided by OpenWeatherMap API as Unix timestamps
 * - Conversion from Unix time to local time accounts for the location's timezone
 * - Uses the unixToLocalTime utility from mist.tsx for time conversion
 * - Takes timezone offset into account for accurate local time display
 *
 * Data source:
 * - Sunset/sunrise times come from forecastData.sys
 * - Timezone offset is provided in seconds from forecastData.timezone
 *
 * Visual presentation:
 * - Displays sunset information at the top with icon
 * - Displays sunrise information at the bottom with icon
 * - Uses distinct visual formatting for the time display
 */

const Sunset = () => {
  const state = useGlobalContext();
  const loading = state?.loading?.forecast;
  const errors = state?.errors?.forecast;
  const forecastData = state?.forecastData;

  // Show loading state
  if (loading) {
    return (
      <div className="dark:bg-dark-grey flex h-[12rem] flex-col items-center justify-center rounded-lg border px-4 shadow-sm dark:shadow-none">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
        <p className="text-muted-foreground mt-2 text-sm">
          Loading sunset data...
        </p>
      </div>
    );
  }

  // Show error state
  if (errors) {
    return (
      <div className="dark:bg-dark-grey flex h-[12rem] flex-col items-center justify-center rounded-lg border px-4 shadow-sm dark:shadow-none">
        <p className="text-red-500">Unable to load sunset data</p>
      </div>
    );
  }

  // Ensure we have all required data
  if (
    !forecastData ||
    !forecastData.sys?.sunset ||
    !forecastData.sys?.sunrise ||
    !forecastData.timezone
  ) {
    return (
      <div className="dark:bg-dark-grey flex h-[12rem] flex-col items-center justify-center rounded-lg border px-4 shadow-sm dark:shadow-none">
        <p className="text-muted-foreground text-sm font-medium">
          Sunset/sunrise data unavailable
        </p>
      </div>
    );
  }

  // Convert Unix timestamps to formatted local time strings
  const sunsetTime = unixToLocalTime(
    forecastData.sys.sunset,
    forecastData.timezone,
  );
  const sunriseTime = unixToLocalTime(
    forecastData.sys.sunrise,
    forecastData.timezone,
  );

  return (
    <div className="dark:bg-dark-grey flex h-[12rem] flex-col justify-between rounded-lg border p-4 shadow-sm dark:shadow-none">
      <div className="sunset-section">
        <h2 className="mb-2 flex items-center gap-2 font-medium">
          {sunset} Sunset
        </h2>
        <p className="text-3xl font-semibold">{sunsetTime}</p>
      </div>

      <div className="sunrise-section">
        <h2 className="mb-2 flex items-center gap-2 font-medium">
          {sunrise} Sunrise
        </h2>
        <p className="text-3xl font-semibold">{sunriseTime}</p>
      </div>
    </div>
  );
};

export default Sunset;
