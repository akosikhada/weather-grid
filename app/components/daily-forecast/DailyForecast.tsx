"use client";

import { useGlobalContext } from "@/app/context/global-context";
import {
  calender,
  clearSky,
  cloudy,
  drizzleIcon,
  rain,
  snow,
} from "@/app/utils/icons";
import { kelvinToCelsius } from "@/app/utils/mist";
import moment from "moment";
import React from "react";

/**
 * Daily Forecast Component
 *
 * Displays weather forecast data for the upcoming days in an easy-to-read format.
 */
const DailyForecast = () => {
  const { dailyForecastData, loading, errors } = useGlobalContext();
  const { city, list } = dailyForecastData || {};

  // Show loading state
  if (loading?.dailyForecast) {
    return (
      <div className="sm-2:col-span-2 dark:bg-dark-grey col-span-full flex h-[12rem] flex-col items-center justify-center gap-3 rounded-lg border px-4 pt-6 shadow-sm md:col-span-2 xl:col-span-2 dark:shadow-none">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
        <p className="text-muted-foreground text-sm font-medium">
          Loading forecast data...
        </p>
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

  // Check if data is available
  if (!dailyForecastData || !city || !list) {
    return (
      <div className="sm-2:col-span-2 dark:bg-dark-grey col-span-full flex h-[12rem] flex-col items-center justify-center gap-3 rounded-lg border px-4 pt-6 shadow-sm md:col-span-2 xl:col-span-2 dark:shadow-none">
        <p className="text-muted-foreground text-sm font-medium">
          Daily forecast data unavailable
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
      <h2 className="flex items-center gap-2 font-medium">
        {calender} Daily Forecast
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
                  <div className="mt-2 text-3xl text-gray-800 dark:text-gray-200">
                    {getWeatherIcon(weatherCondition)}
                  </div>
                  <p className="mt-2 text-xl font-medium text-gray-900 dark:text-white">
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
