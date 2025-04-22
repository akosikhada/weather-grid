"use client";

import { useGlobalContext } from "@/app/context/global-context";
import { thermometer } from "@/app/utils/icons";
import { kelvinToCelsius } from "@/app/utils/mist";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ApparentTemperature = () => {
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

  // Validate data integrity before proceeding with apparent temperature rendering
  if (!forecastData?.main) {
    return (
      <div className="dark:bg-dark-grey flex h-[12rem] flex-col items-center justify-center gap-3 rounded-lg border px-4 pt-6 shadow-sm dark:shadow-none">
        <p className="text-muted-foreground text-sm font-medium">
          Apparent temperature data is currently unavailable. Please check back
          later.
        </p>
      </div>
    );
  }

  // Only destructure after confirming data exists
  const { feels_like, temp_min, temp_max } = forecastData.main;

  const feelsLikeText = (
    feelsLike: number,
    minTemp: number,
    maxTemp: number,
  ) => {
    // Convert temperatures from Kelvin to Celsius first
    const feelsLikeCelsius = kelvinToCelsius(feelsLike);
    const minTempCelsius = kelvinToCelsius(minTemp);
    const maxTempCelsius = kelvinToCelsius(maxTemp);

    // Calculate the average temperature in Celsius by adding the minimum and maximum temperatures and dividing by 2
    const avgTemp = (minTempCelsius + maxTempCelsius) / 2;

    // Special case for extreme heat
    if (feelsLikeCelsius >= 35) {
      return "SCORCHING HOT! Like walking into an oven.";
    }

    // Special case for extreme cold
    if (feelsLikeCelsius <= 0) {
      return "FREEZING COLD! Frostbite risk.";
    }

    // Normal comparison logic
    if (feelsLikeCelsius < avgTemp - 5) {
      return "FEELS MUCH COLDER than it looks!";
    }
    if (feelsLikeCelsius >= avgTemp - 5 && feelsLikeCelsius <= avgTemp + 5) {
      return "ACTUAL FEEL matches display.";
    }
    if (feelsLikeCelsius > avgTemp + 5) {
      return "FEELS MUCH HOTTER than it looks!";
    }

    return "Temperature is as expected.";
  };

  const feelsLikeDescription = feelsLikeText(feels_like, temp_min, temp_max);

  return (
    <div className="dark:bg-dark-grey flex h-[12rem] flex-col justify-between rounded-lg border p-4 shadow-sm dark:shadow-none">
      <h2 className="flex items-center gap-2 font-medium">
        {thermometer} Feels Like
      </h2>
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-[26px] font-bold">{kelvinToCelsius(feels_like)}°C</p>
      </div>
      <p className="text-[13px]">{feelsLikeDescription}</p>
    </div>
  );
};

export default ApparentTemperature;
