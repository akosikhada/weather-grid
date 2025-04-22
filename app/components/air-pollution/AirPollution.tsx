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
  const { airPollutionData, isLoading, errors } = useGlobalContext();

  // Show loading state
  if (isLoading?.airPollution) {
    return (
      <div className="air-pollution sm-2:col-span-2 dark:bg-dark-grey relative col-span-full h-[12rem] overflow-hidden rounded-lg border p-4 shadow-sm md:col-span-2 xl:col-span-2 dark:shadow-none">
        <Skeleton className="absolute inset-0 h-full w-full" />
      </div>
    );
  }

  // Show error state
  if (errors?.airPollution) {
    return (
      <div className="air-pollution sm-2:col-span-2 dark:bg-dark-grey col-span-full flex h-[12rem] flex-col items-center justify-center gap-3 rounded-lg border px-4 pt-6 shadow-sm md:col-span-2 xl:col-span-2 dark:shadow-none">
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
      <div className="air-pollution sm-2:col-span-2 dark:bg-dark-grey col-span-full flex h-[12rem] flex-col items-center justify-center gap-3 rounded-lg border px-4 pt-6 shadow-sm md:col-span-2 xl:col-span-2 dark:shadow-none">
        <p className="text-muted-foreground text-sm font-medium">
          Air pollution data is currently unavailable. Please check back later.
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
    <div className="air-pollution sm-2:col-span-2 dark:bg-dark-grey col-span-full flex h-[12rem] flex-col gap-6 rounded-lg border p-4 pt-6 shadow-sm md:col-span-2 xl:col-span-2 dark:shadow-none">
      <h2 className="flex items-center gap-2 font-medium">
        {thermo} Air Pollution
      </h2>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between text-sm">
          <span>
            Air Quality Index:{" "}
            <strong>{airPollutionData.list[0].main.aqi}</strong> (1-5 scale)
          </span>
          <span className="font-medium">{aqiValue}%</span>
        </div>
        <Progress value={aqiValue} max={100} className="progress" />
      </div>
      <p className="text-[15px]">
        Air Quality is {aqiInfo?.description || "Unavailable"}
      </p>
    </div>
  );
};

export default AirPollution;
