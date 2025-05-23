"use client";

import { useGlobalContext } from "@/app/context/global-context";
import {
  calendar,
  clearSky,
  cloudy,
  drizzleIcon,
  rain,
  snow,
} from "@/app/utils/icons";
import { kelvinToCelsius } from "@/app/utils/mist";
import moment from "moment";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Daily Forecast Component
 *
 * Displays weather forecast data for the upcoming days in an easy-to-read format.
 */
const DailyForecast = () => {
  const { dailyForecastData, isLoading, errors } = useGlobalContext();
  const { city, list } = dailyForecastData || {};

  // Show loading state
  if (isLoading?.dailyForecast) {
    return (
      <div className="sm-2:col-span-2 dark:bg-dark-grey relative col-span-full h-[12rem] overflow-hidden rounded-lg border p-4 shadow-sm md:col-span-2 xl:col-span-2 dark:shadow-none">
        <Skeleton className="absolute inset-0 h-full w-full" />
      </div>
    );
  }

  // Show error state
  if (errors?.dailyForecast) {
    return (
      <div className="sm-2:col-span-2 dark:bg-dark-grey col-span-full flex h-[12rem] flex-col items-center justify-center gap-3 rounded-lg border px-4 pt-6 shadow-sm md:col-span-2 xl:col-span-2 dark:shadow-none">
        <p className="text-destructive text-sm font-medium">
          Error loading forecast data: {errors.dailyForecast}
        </p>
      </div>
    );
  }

  // Validate data integrity before proceeding with daily forecast rendering
  if (!dailyForecastData || !city || !list) {
    return (
      <div className="sm-2:col-span-2 dark:bg-dark-grey col-span-full flex h-[12rem] flex-col items-center justify-center gap-3 rounded-lg border px-4 pt-6 shadow-sm md:col-span-2 xl:col-span-2 dark:shadow-none">
        <p className="text-muted-foreground text-sm font-medium">
          Daily forecast data is currently unavailable. Please check back later.
        </p>
      </div>
    );
  }

  // Get current time for "Now" comparison
  const now = moment();

  // Get today's date
  const todayDate = new Date();
  const todayString = todayDate.toISOString().split("T")[0];

  // Get weather data from the first forecast item
  const currentForecast = list[0];
  const weatherMain = currentForecast?.weather?.[0]?.main || "Clear";

  // Define types for forecast data
  interface ForecastItem {
    dt_txt: string;
    main: { temp: number };
    weather: Array<{ main: string }>;
  }

  // Get unique dates from the forecast
  const uniqueDates = [
    ...new Set(
      list.map((forecast: ForecastItem) =>
        moment(forecast.dt_txt).format("YYYY-MM-DD"),
      ),
    ),
  ];

  // Get forecast for the next 5 days
  const fiveDayForecast = uniqueDates.slice(0, 5).map((date) => {
    // Get forecasts for this date
    const forecasts = list.filter(
      (forecast: ForecastItem) =>
        moment(forecast.dt_txt).format("YYYY-MM-DD") === date,
    );

    // Return representative forecast for the day (noon if available)
    const midDayForecast =
      forecasts.find(
        (f: ForecastItem) => moment(f.dt_txt).format("HH") === "12",
      ) || forecasts[0];

    return {
      date,
      forecast: midDayForecast,
    };
  });

  // Get weather icon
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
    <div className="sm-2:col-span-2 dark:bg-dark-grey col-span-full flex h-[12rem] flex-col rounded-lg border p-4 shadow-sm md:col-span-2 xl:col-span-2 dark:shadow-none">
      <h2 className="mb-2 flex items-center gap-2 font-medium">
        {calendar} Daily Forecast
      </h2>
      <div className="flex h-full w-full items-center justify-between">
        {fiveDayForecast.length < 1 ? (
          <div className="flex w-full items-center justify-center">
            <p className="text-rose-500">No Data Available!</p>
          </div>
        ) : (
          <>
            {fiveDayForecast.map((item, index) => {
              const forecast = item.forecast as ForecastItem;
              const forecastDate = moment(item.date as string);
              const isToday = forecastDate.isSame(now, "day");
              const weatherCondition = forecast.weather[0].main;

              return (
                <div
                  key={`forecast-${index}`}
                  className="flex flex-col items-center justify-center gap-2"
                >
                  <p
                    className={
                      isToday
                        ? "text-sm font-semibold text-black dark:text-white"
                        : "text-sm text-gray-600 dark:text-gray-300"
                    }
                  >
                    {isToday ? "Today" : forecastDate.format("ddd")}
                  </p>
                  <div className="mt-2 text-3xl font-medium">
                    {getWeatherIcon(weatherCondition)}
                  </div>
                  <p className="mt-2 text-xl font-medium">
                    {kelvinToCelsius(forecast.main.temp)}°C
                  </p>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default DailyForecast;
