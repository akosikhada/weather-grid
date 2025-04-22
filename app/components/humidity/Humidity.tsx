"use client";

import { useGlobalContext } from "@/app/context/global-context";
import { droplets } from "@/app/utils/icons";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Humidity = () => {
  const { forecastData, isLoading, errors } = useGlobalContext();

  // Show loading state
  if (isLoading?.forecast) {
    return (
      <div className="dark:bg-dark-grey relative h-[12rem] overflow-hidden rounded-lg border p-4 shadow-sm dark:shadow-none">
        <Skeleton className="absolute inset-0 h-full w-full" />
      </div>
    );
  }

  // Show error state
  if (errors?.forecast) {
    return (
      <div className="dark:bg-dark-grey flex h-[12rem] flex-col items-center justify-center gap-3 rounded-lg border px-4 pt-6 shadow-sm dark:shadow-none">
        <p className="text-destructive text-sm font-medium">
          Error: {errors.forecast}
        </p>
      </div>
    );
  }

  // Validate data integrity before proceeding with humidity rendering
  if (!forecastData?.main) {
    return (
      <div className="dark:bg-dark-grey flex h-[12rem] flex-col items-center justify-center gap-3 rounded-lg border px-4 pt-6 shadow-sm dark:shadow-none">
        <p className="text-muted-foreground text-sm font-medium">
          Humidity data is currently unavailable. Please check back later.
        </p>
      </div>
    );
  }

  const { humidity } = forecastData?.main;

  const getHumidityText = (humidity: number) => {
    if (humidity < 30) return "DRY AIR! May cause dry skin and throat.";
    if (humidity >= 30 && humidity < 50)
      return "PERFECT HUMIDITY! Comfortable breathing.";
    if (humidity >= 50 && humidity < 70)
      return "HIGH MOISTURE! Feels sticky, allergens increase.";
    if (humidity >= 70)
      return "EXTREMELY WET AIR! Uncomfortable and mold risk.";
    return "Humidity data unavailable";
  };

  const humidityDescription = getHumidityText(humidity);

  return (
    <div className="dark:bg-dark-grey flex h-[12rem] flex-col justify-between rounded-lg border p-4 shadow-sm dark:shadow-none">
      <h2 className="flex items-center gap-2 font-medium">
        {droplets} Humidity
      </h2>
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-[26px] font-bold">{humidity}%</p>
      </div>
      <p className="text-[13px]">{humidityDescription}</p>
    </div>
  );
};

export default Humidity;
