"use client";

import { useGlobalContext } from "@/app/context/global-context";
import { people } from "@/app/utils/icons";
import { formatNumber } from "@/app/utils/mist";
import { DEFAULT_CITY_POPULATION } from "@/app/utils/default-application";
import React, { useEffect, useState } from "react";

function Population() {
  const { dailyForecastData, loading, errors } = useGlobalContext();
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
  if (loading?.dailyForecast) {
    return (
      <div className="dark:bg-dark-grey flex h-[12rem] flex-col items-center justify-center gap-3 rounded-lg border p-4 shadow-sm dark:shadow-none">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
        <p className="text-muted-foreground text-sm font-medium">
          Loading population data...
        </p>
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

  // Check if data is available
  if (!population) {
    return (
      <div className="dark:bg-dark-grey flex h-[12rem] flex-col items-center justify-center gap-3 rounded-lg border p-4 shadow-sm dark:shadow-none">
        <p className="text-muted-foreground text-sm font-medium">
          Population data unavailable
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
        <span className="text-3xl font-bold">{formatNumber(population)}</span>
        <span className="text-base">Residents</span>
      </div>
      <p className="text-sm">Estimated population data for {cityName}.</p>
    </div>
  );
}

export default Population;
