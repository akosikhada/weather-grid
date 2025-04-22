"use client";

import { useGlobalContext } from "@/app/context/global-context";
import { people } from "@/app/utils/icons";
import { formatNumber } from "@/app/utils/mist";
import { DEFAULT_CITY_POPULATION } from "@/app/utils/default-application";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function Population() {
  const { dailyForecastData, isLoading, errors } = useGlobalContext();
  const [population, setPopulation] = useState(null);
  const [cityName, setCityName] = useState("");

  // Extract population data from weather response
  useEffect(() => {
    if (dailyForecastData && dailyForecastData.city) {
      // Use constant for default population
      setCityName(dailyForecastData.city.name);
      setPopulation(
        dailyForecastData.city.population || DEFAULT_CITY_POPULATION,
      );
    }
  }, [dailyForecastData]);

  // Show loading state
  if (isLoading?.dailyForecast) {
    return (
      <div className="dark:bg-dark-grey relative h-[12rem] overflow-hidden rounded-lg border p-4 shadow-sm dark:shadow-none">
        <Skeleton className="absolute inset-0 h-full w-full" />
      </div>
    );
  }

  // Show error state
  if (errors?.dailyForecast) {
    return (
      <div className="dark:bg-dark-grey flex h-[12rem] flex-col items-center justify-center gap-3 rounded-lg border p-4 shadow-sm dark:shadow-none">
        <p className="text-destructive text-sm font-medium">
          Error loading population data
        </p>
      </div>
    );
  }

  // Validate data integrity before proceeding with population rendering
  if (!population) {
    return (
      <div className="dark:bg-dark-grey flex h-[12rem] flex-col items-center justify-center gap-3 rounded-lg border p-4 shadow-sm dark:shadow-none">
        <p className="text-muted-foreground text-sm font-medium">
          Population data is currently unavailable. Please check back later.
        </p>
      </div>
    );
  }

  // Get the current year
  const currentYear = new Date().getFullYear();

  return (
    <div className="dark:bg-dark-grey flex h-[12rem] flex-col justify-between rounded-lg border p-4 shadow-sm dark:shadow-none">
      <h2 className="flex items-center gap-2 font-medium">
        {people} Population
      </h2>
      <div className="flex flex-col items-center justify-center">
        <span className="text-[26px] font-bold">
          {formatNumber(population)}
        </span>
        <span className="text-[15px]">Residents</span>
      </div>
      <p className="text-[13px]">Estimated population data for {cityName}.</p>
    </div>
  );
}

export default Population;
