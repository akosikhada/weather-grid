"use client";

import { useGlobalContext } from "@/app/context/global-context";
import { gauge } from "@/app/utils/icons";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const AtmosphericPressure = () => {
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

  // Validate data integrity before proceeding with atmospheric pressure rendering
  if (!forecastData?.main) {
    return (
      <div className="dark:bg-dark-grey flex h-[12rem] flex-col items-center justify-center gap-3 rounded-lg border px-4 pt-6 shadow-sm dark:shadow-none">
        <p className="text-muted-foreground text-sm font-medium">
          Atmospheric pressure data are currently unavailable. Please check back
          later.
        </p>
      </div>
    );
  }

  const { pressure } = forecastData.main;

  const getAtmosphericPressureText = (pressure: number) => {
    if (pressure < 1000) return "VERY LOW PRESSURE! Storm conditions likely.";

    if (pressure >= 1000 && pressure < 1015)
      return "LOW PRESSURE! Clouds and precipitation possible.";

    if (pressure >= 1015 && pressure < 1025)
      return "NORMAL PRESSURE! Stable weather conditions.";

    if (pressure >= 1025 && pressure < 1040)
      return "HIGH PRESSURE! Clear skies and dry conditions.";

    if (pressure >= 1040)
      return "VERY HIGH PRESSURE! Extremely stable, possibly hot or cold.";

    return "Unavailable: Atmospheric pressure data is currently unavailable.";
  };

  const atmosphericPressureDescription = getAtmosphericPressureText(pressure);

  return (
    <div className="dark:bg-dark-grey flex h-[12rem] flex-col justify-between rounded-lg border p-4 shadow-sm dark:shadow-none">
      <h2 className="flex items-center gap-2 font-medium">{gauge} Pressure</h2>
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-[26px] font-bold">{pressure} hPa</p>
      </div>
      <p className="text-[13px]">{atmosphericPressureDescription}</p>
    </div>
  );
};

export default AtmosphericPressure;
