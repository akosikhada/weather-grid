"use client";

import { useGlobalContext } from "@/app/context/global-context";
import {
  clearSky,
  cloudy,
  drizzleIcon,
  navigation,
  rain,
  snow,
} from "@/app/utils/icons";
import { kelvinToCelsius } from "@/app/utils/mist";
import React, { useState, useEffect, useRef } from "react";
import moment from "moment";

/**
 * Temperature Component
 *
 * Displays real-time weather data with location-specific time using global context.
 *
 * Key features:
 * - Consumes global weather data from context API
 * - Formats temperature from Kelvin to Celsius
 * - Maintains local state for time display with timezone adjustment
 * - Implements dynamic weather icon selection based on conditions
 * - Handles loading states and data validation gracefully
 *
 * Note on hooks implementation:
 * - All hooks are called unconditionally at the top level to comply with React's Rules of Hooks
 * - useEffect includes early return pattern to handle initial render safely
 * - Data destructuring occurs only after existence checks to prevent runtime errors
 * - Uses useRef to optimize timezone calculations and prevent unnecessary re-renders
 */

const Temperature = () => {
  const { forecastData, loading, errors } = useGlobalContext();
  const [localTime, setLocalTime] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timezoneRef = useRef<number | null>(null);

  // Set timezone reference when data is loaded
  // This prevents recalculating timezone offset on every render
  useEffect(() => {
    if (
      forecastData &&
      Object.keys(forecastData).length &&
      forecastData.timezone &&
      timezoneRef.current !== forecastData.timezone
    ) {
      timezoneRef.current = forecastData.timezone;

      // Initial time update without waiting for interval
      updateTime();
    }
  }, [forecastData]);

  // Separate effect for time updates to avoid recreating interval unnecessarily
  useEffect(() => {
    // Only start interval if we have timezone data
    if (timezoneRef.current !== null) {
      // Clear any existing interval first
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // Set new interval
      intervalRef.current = setInterval(updateTime, 1000);
    }

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [timezoneRef.current]);

  // Extract time update logic to a separate function for reuse
  const updateTime = () => {
    if (timezoneRef.current === null) return;

    const localMoment = moment().utcOffset(timezoneRef.current / 60);
    const formattedTime = localMoment.format("hh:mm:ss A"); // 12 hour format
    const formattedDay = localMoment.format("dddd"); // Day of the week

    setLocalTime(formattedTime);
    setCurrentDay(formattedDay);
  };

  // Show loading state
  if (loading?.forecast) {
    return (
      <div className="dark:bg-dark-grey flex h-56 flex-col items-center justify-center gap-3 rounded-lg border px-4 pt-6 pb-5 shadow-sm dark:shadow-none">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
        <p className="text-muted-foreground text-sm font-medium">
          Fetching weather data...
        </p>
      </div>
    );
  }

  // Show error state
  if (errors?.forecast) {
    return (
      <div className="dark:bg-dark-grey flex h-56 flex-col items-center justify-center gap-3 rounded-lg border px-4 pt-6 pb-5 shadow-sm dark:shadow-none">
        <p className="text-destructive text-sm font-medium">
          Error: {errors.forecast}
        </p>
      </div>
    );
  }

  // Check if data is available
  if (
    !forecastData ||
    !Object.keys(forecastData).length ||
    !forecastData.weather
  ) {
    return (
      <div className="dark:bg-dark-grey flex h-56 flex-col items-center justify-center gap-3 rounded-lg border px-4 pt-6 pb-5 shadow-sm dark:shadow-none">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
        <p className="text-muted-foreground text-sm font-medium">
          Weather data unavailable
        </p>
      </div>
    );
  }

  const { main, name, weather } = forecastData;

  const temperature = kelvinToCelsius(main?.temp);
  const minimumTemperature = kelvinToCelsius(main?.temp_min);
  const maximumTemperature = kelvinToCelsius(main?.temp_max);
  const { main: weatherMain, description } = weather[0];

  const getWeatherIcon = () => {
    switch (weatherMain) {
      case "Drizzle":
        return drizzleIcon;
      case "Rain":
        return rain;
      case "Snow":
        return snow;
      case "Clear":
        return clearSky;
      case "Clouds":
        return cloudy;
      default:
        return clearSky;
    }
  };

  return (
    <div className="dark:bg-dark-grey flex flex-col justify-between rounded-lg border px-4 pt-6 pb-5 shadow-sm dark:shadow-none">
      <p className="flex items-center justify-between">
        <span className="font-medium">{currentDay}</span>
        <span className="font-medium">{localTime}</span>
      </p>
      <p className="flex gap-1 pt-2 font-bold">
        <span>{name}</span>
        <span>{navigation}</span>
      </p>
      <p className="self-center py-10 text-9xl font-bold">{temperature}°C</p>
      <div>
        <div>
          <span>{getWeatherIcon()}</span>
          <p className="pt-2 text-lg font-medium capitalize">{description}</p>
        </div>
        <p className="flex items-center gap-2">
          <span>Low: {minimumTemperature}°C</span>
          <span>High: {maximumTemperature}°C</span>
        </p>
      </div>
    </div>
  );
};

export default Temperature;
