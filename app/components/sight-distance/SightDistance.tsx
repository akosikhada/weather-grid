"use client";

import { useGlobalContext } from "@/app/context/global-context";
import { eye } from "@/app/utils/icons";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SightDistance = () => {
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

  // Validate data integrity before proceeding with visibility rendering
  if (!forecastData?.main) {
    return (
      <div className="dark:bg-dark-grey flex h-[12rem] flex-col items-center justify-center gap-3 rounded-lg border px-4 pt-6 shadow-sm dark:shadow-none">
        <p className="text-muted-foreground text-sm font-medium">
          Visibility data is currently unavailable. Please check back later.
        </p>
      </div>
    );
  }

  const { visibility } = forecastData;

  // Convert visibility from meters to kilometers by dividing by 1000
  const sightDistanceInKilometers = Math.round(visibility / 1000);

  const getSightDistanceText = (sightDistanceInKilometers: number) => {
    if (sightDistanceInKilometers > 10)
      return "CRYSTAL CLEAR! Exceptional visibility."; // >10km: Exceptional visibility
    if (sightDistanceInKilometers > 5)
      return "CLEAR VIEW! Excellent visibility."; // 5-10km: Excellent visibility
    if (sightDistanceInKilometers > 2)
      return "MODERATE VIEW! Some visibility limitations."; // 2-5km: Moderate visibility
    if (sightDistanceInKilometers <= 2)
      return "LIMITED VIEW! Restricted visibility ahead."; // less than 2km: Limited visibility
    return "Unavailable: Visibility data unavailable";
  };

  const sightDistanceDescription = getSightDistanceText(
    sightDistanceInKilometers,
  );

  return (
    <div className="dark:bg-dark-grey flex h-[12rem] flex-col justify-between rounded-lg border p-4 shadow-sm dark:shadow-none">
      <h2 className="flex items-center gap-2 font-medium">{eye} Visibility</h2>
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-[26px] font-bold">{sightDistanceInKilometers} km</p>
      </div>
      <p className="text-[13px]">{sightDistanceDescription}</p>
    </div>
  );
};

export default SightDistance;
