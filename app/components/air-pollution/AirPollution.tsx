"use client";

import { useGlobalContext } from "@/app/context/global-context";
import { thermo } from "@/app/utils/icons";
import { airQualityIndex } from "@/app/utils/mist";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

/**
 * Air Pollution Component
 *
 * Renders current air quality information with a visual progress indicator and textual description.
 *
 * Features:
 * - Displays Air Quality Index (AQI) visually using a progress bar
 * - Shows human-readable air quality descriptions from a predefined scale
 * - Handles loading, error, and empty data states appropriately
 * - Uses the global context to access air pollution data
 *
 * Implementation notes:
 * - OpenWeatherMap API returns AQI on a 1-5 scale, which is converted to 0-100 for the UI
 * - Matches the AQI value with predefined descriptions in airQualityIndex
 * - Contains three conditional rendering states: loading, error, and no data
 *
 * Visual presentation:
 * - Displays a thermometer icon alongside the title
 * - Uses a progress bar to show the current air quality level
 * - Shows detailed text description based on the current AQI value
 */

const AirPollution = () => {
  const { airPollutionData, loading, errors } = useGlobalContext();

  // Show loading state
  if (loading?.airPollution) {
    return (
      <div className="air-pollution sm-2:col-span-2 dark:bg-dark-grey col-span-full flex h-[12rem] flex-col items-center justify-center gap-3 rounded-lg border px-4 pt-6 shadow-sm dark:shadow-none">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
        <p className="text-muted-foreground text-sm font-medium">
          Fetching air pollution data...
        </p>
      </div>
    );
  }

  // Show error state
  if (errors?.airPollution) {
    return (
      <div className="air-pollution sm-2:col-span-2 dark:bg-dark-grey col-span-full flex h-[12rem] flex-col items-center justify-center gap-3 rounded-lg border px-4 pt-6 shadow-sm dark:shadow-none">
        <p className="text-destructive text-sm font-medium">
          Error loading air pollution data: {errors.airPollution}
        </p>
      </div>
    );
  }

  // Show empty state if data is missing or incomplete
  if (
    !airPollutionData ||
    !airPollutionData.list ||
    !airPollutionData.list[0] ||
    !airPollutionData.list[0].main
  ) {
    return (
      <div className="air-pollution sm-2:col-span-2 dark:bg-dark-grey col-span-full flex h-[12rem] flex-col items-center justify-center gap-3 rounded-lg border px-4 pt-6 shadow-sm dark:shadow-none">
        <p className="text-muted-foreground text-sm font-medium">
          Air pollution data unavailable
        </p>
      </div>
    );
  }

  // Convert API's 1-5 scale to 0-100 for better visual representation
  const aqiValue = airPollutionData.list[0].main.aqi * 10; // Convert 1-5 scale to 0-100

  // Find the appropriate air quality description based on the current AQI value
  const aqiInfo = airQualityIndex.find((item) => {
    return aqiValue <= item.rating; // Find the first index where the value is less than or equal to the rating
  });

  return (
    <div className="air-pollution sm-2:col-span-2 dark:bg-dark-grey col-span-full flex h-[12rem] flex-col gap-8 rounded-lg border p-4 pt-6 shadow-sm dark:shadow-none">
      <h2 className="flex items-center gap-2 font-medium">
        {thermo} Air Pollution
      </h2>
      <Progress value={aqiValue} max={100} className="progress" />
      <p className="">
        The Air Quality is {aqiInfo?.description || "Unavailable"}.
      </p>
    </div>
  );
};

export default AirPollution;
