"use client";

import { useGlobalContext } from "@/app/context/global-context";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { kelvinToCelsius, unixToLocalTime } from "@/app/utils/mist";
import {
  calendar,
  clearSky,
  cloudy,
  drizzleIcon,
  rain,
  snow,
} from "@/app/utils/icons";
import moment from "moment";

const FiveDayForecast = () => {
  const { dailyForecastData, isLoading, errors } = useGlobalContext();

  // Show loading state
  if (isLoading?.dailyForecast) {
    return (
      <div className="dark:bg-dark-grey relative h-full flex-1 overflow-hidden rounded-lg border p-4 shadow-sm dark:shadow-none">
        <Skeleton className="absolute inset-0 h-full w-full" />
      </div>
    );
  }

  // Show error state
  if (errors?.dailyForecast) {
    return (
      <div className="dark:bg-dark-grey flex h-full flex-1 flex-col items-center justify-center gap-3 rounded-lg border px-4 pt-6 shadow-sm dark:shadow-none">
        <p className="text-destructive text-sm font-medium">
          Error: {errors.dailyForecast}
        </p>
      </div>
    );
  }

  // Validate data integrity before proceeding with forecast rendering
  if (!dailyForecastData || !dailyForecastData.list) {
    return (
      <div className="dark:bg-dark-grey flex h-full flex-1 flex-col items-center justify-center gap-3 rounded-lg border px-4 pt-6 shadow-sm dark:shadow-none">
        <p className="text-muted-foreground text-sm font-medium">
          Forecast data is currently unavailable. Please check back later.
        </p>
      </div>
    );
  }

  const { city, list } = dailyForecastData;

  const fiveDayProcessData = (
    dailyData: {
      main: { temp_min: number; temp_max: number };
      dt: number;
      weather?: Array<{ main: string; description: string; icon?: string }>;
    }[],
    index: number,
  ) => {
    let minTemp = Number.MAX_VALUE;
    let maxTemp = Number.MIN_VALUE;
    let weatherCondition = "Clear"; // Default weather condition

    // Create a frequency map to determine most common weather condition for the day
    const weatherFrequency: Record<string, number> = {};

    dailyData.forEach(
      (day: {
        main: { temp_min: number; temp_max: number };
        dt: number;
        weather?: Array<{ main: string; description: string; icon?: string }>;
      }) => {
        if (day.main.temp_min < minTemp) {
          minTemp = day.main.temp_min;
        }
        if (day.main.temp_max > maxTemp) {
          maxTemp = day.main.temp_max;
        }

        // Track weather condition frequency
        if (day.weather && day.weather.length > 0) {
          const condition = day.weather[0].main;
          weatherFrequency[condition] = (weatherFrequency[condition] || 0) + 1;

          // Prioritize daytime weather (between 8am and 6pm)
          const hour = parseInt(moment.unix(day.dt).format("HH"));
          if (hour >= 8 && hour <= 18) {
            // Give extra weight to daytime readings
            weatherFrequency[condition] += 1;
          }
        }
      },
    );

    // Find the most frequent weather condition
    let maxFrequency = 0;
    Object.entries(weatherFrequency).forEach(([condition, frequency]) => {
      if (frequency > maxFrequency) {
        maxFrequency = frequency;
        weatherCondition = condition;
      }
    });

    // Format day name
    const date = moment.unix(dailyData[0].dt);
    const dayName = index === 0 ? "Today" : date.format("ddd");
    const dayDate = date.format("MMM D");

    return {
      dayName: dayName,
      dayDate: dayDate,
      minTemp: kelvinToCelsius(minTemp),
      maxTemp: kelvinToCelsius(maxTemp),
      weatherCondition: weatherCondition,
    };
  };

  const fiveDayForecasts = [];

  // Process 5-day forecast data in 8-hour increments
  for (let i = 0, dayIndex = 0; i < 40 && dayIndex < 5; i += 8, dayIndex++) {
    const dailyData = list.slice(i, i + 8);
    if (dailyData.length > 0) {
      fiveDayForecasts.push(fiveDayProcessData(dailyData, dayIndex));
    }
  }

  // Function to get temperature gradient color
  const getTemperatureGradient = (minTemp: number, maxTemp: number) => {
    const avgTemp = (minTemp + maxTemp) / 2;

    if (avgTemp >= 30) {
      return "bg-gradient-to-r from-cyan-400 via-teal-300 to-yellow-300";
    } else if (avgTemp >= 20) {
      return "bg-gradient-to-r from-cyan-400 to-teal-300";
    } else {
      return "bg-gradient-to-r from-blue-400 to-cyan-400";
    }
  };

  // Function to get weather icon
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
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
    <div className="dark:bg-dark-grey flex flex-1 flex-col rounded-lg border px-4 pt-4 pb-4 shadow-sm dark:shadow-none">
      <h2 className="mb-2 flex items-center gap-2 font-medium">
        {calendar} 5-Day Forecast for {city.name}
      </h2>

      <div className="forecast-list mt-2 space-y-5">
        {fiveDayForecasts.map((day, i) => {
          const tempGradient = getTemperatureGradient(day.minTemp, day.maxTemp);

          return (
            <div
              key={i}
              className="daily-forecast flex flex-col gap-2 border-b border-gray-200 py-2 last:border-b-0 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium">{day.dayName}</p>
                <p className="text-xs text-gray-800 dark:text-gray-400">
                  {day.dayDate}
                </p>
              </div>

              <div className="flex flex-1 items-center justify-between gap-4">
                <div className="flex w-12 flex-col items-start">
                  <span className="text-xs text-gray-800 dark:text-gray-400">
                    Low
                  </span>
                  <p className="font-medium">{day.minTemp}°C</p>
                </div>
                <div className="flex items-center">
                  {getWeatherIcon(day.weatherCondition)}
                </div>
                <div
                  className={`temperature h-2 flex-1 rounded-full ${tempGradient}`}
                ></div>
                <div className="flex w-12 flex-col items-end">
                  <span className="text-xs text-gray-800 dark:text-gray-400">
                    High
                  </span>
                  <p className="font-medium">{day.maxTemp}°C</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FiveDayForecast;
