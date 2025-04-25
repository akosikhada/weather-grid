"use client";

import axios from "axios";
import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import {
  DEFAULT_LATITUDE,
  DEFAULT_LONGITUDE,
} from "../utils/default-application";

/**
 * Global Weather Context
 *
 * Optimized implementation with:
 * 1. Parallel API fetching for improved performance
 * 2. Loading states to track fetch progress
 * 3. Proper error handling with error states
 * 4. Memoized fetch functions to prevent unnecessary re-renders
 * 5. Consolidated state management for better performance
 * 6. Support for current, daily forecast, air pollution, and UV index data
 */

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [state, setState] = useState({
    forecastData: {},
    airPollutionData: {},
    dailyForecastData: {},
    uvData: {},
    locationSearchData: [],
    activeCityCoords: {
      lat: DEFAULT_LATITUDE,
      lon: DEFAULT_LONGITUDE,
    },
    isLoading: {
      forecast: false,
      airPollution: false,
      dailyForecast: false,
      uv: false,
      locationSearch: false,
    },
    errors: {
      forecast: null,
      airPollution: null,
      dailyForecast: null,
      uv: null,
      locationSearch: null,
    },
  });

  // Function to set active city coordinates
  const setActiveCityCoords = useCallback((lat, lon) => {
    setState((prev) => ({
      ...prev,
      activeCityCoords: { lat, lon },
    }));
  }, []);

  // Memoized fetch functions to prevent unnecessary re-renders
  // Fetch Forecast Data
  const fetchForecastData = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      isLoading: { ...prev.isLoading, forecast: true },
      errors: { ...prev.errors, forecast: null },
    }));

    try {
      // Use active city coordinates
      const { lat, lon } = state.activeCityCoords;

      const response = await axios.get(`/api/weather?lat=${lat}&lon=${lon}`);
      setState((prev) => ({
        ...prev,
        forecastData: response.data,
        isLoading: { ...prev.isLoading, forecast: false },
      }));

      return response.data;
    } catch (error) {
      console.error("Error Fetching Forecast Data:", error.message);
      setState((prev) => ({
        ...prev,
        isLoading: { ...prev.isLoading, forecast: false },
        errors: { ...prev.errors, forecast: error.message },
      }));
      return null;
    }
  }, [state.activeCityCoords]);

  // Fetch Air Pollution Data
  const fetchAirPollutionData = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      isLoading: { ...prev.isLoading, airPollution: true },
      errors: { ...prev.errors, airPollution: null },
    }));

    try {
      // Use active city coordinates
      const { lat, lon } = state.activeCityCoords;

      const response = await axios.get(`/api/pollution?lat=${lat}&lon=${lon}`);
      setState((prev) => ({
        ...prev,
        airPollutionData: response.data,
        isLoading: { ...prev.isLoading, airPollution: false },
      }));

      return response.data;
    } catch (error) {
      console.error("Error Fetching Air Pollution Data:", error.message);
      setState((prev) => ({
        ...prev,
        isLoading: { ...prev.isLoading, airPollution: false },
        errors: { ...prev.errors, airPollution: error.message },
      }));
      return null;
    }
  }, [state.activeCityCoords]);

  // Daily forecast data fetch function
  const fetchDailyForecastData = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      isLoading: { ...prev.isLoading, dailyForecast: true },
      errors: { ...prev.errors, dailyForecast: null },
    }));

    try {
      // Use active city coordinates
      const { lat, lon } = state.activeCityCoords;

      const response = await axios.get(
        `/api/daily-forecast?lat=${lat}&lon=${lon}`,
      );
      setState((prev) => ({
        ...prev,
        dailyForecastData: response.data,
        isLoading: { ...prev.isLoading, dailyForecast: false },
      }));

      return response.data;
    } catch (error) {
      console.error("Error Fetching Daily Forecast Data:", error.message);
      setState((prev) => ({
        ...prev,
        isLoading: { ...prev.isLoading, dailyForecast: false },
        errors: { ...prev.errors, dailyForecast: error.message },
      }));
      return null;
    }
  }, [state.activeCityCoords]);

  // UV data fetch function
  const fetchUVData = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      isLoading: { ...prev.isLoading, uv: true },
      errors: { ...prev.errors, uv: null },
    }));

    try {
      // Use active city coordinates
      const { lat, lon } = state.activeCityCoords;

      const response = await axios.get(`/api/uv?lat=${lat}&lon=${lon}`);
      setState((prev) => ({
        ...prev,
        uvData: response.data,
        isLoading: { ...prev.isLoading, uv: false },
      }));

      return response.data;
    } catch (error) {
      console.error("Error Fetching UV Data:", error.message);
      setState((prev) => ({
        ...prev,
        isLoading: { ...prev.isLoading, uv: false },
        errors: { ...prev.errors, uv: error.message },
      }));
      return null;
    }
  }, [state.activeCityCoords]);

  // Location search function
  const fetchLocationSearchData = useCallback(async (query) => {
    if (!query || query.trim() === "") return;

    setState((prev) => ({
      ...prev,
      isLoading: { ...prev.isLoading, locationSearch: true },
      errors: { ...prev.errors, locationSearch: null },
    }));

    try {
      const response = await axios.get(
        `/api/location-search?q=${encodeURIComponent(query)}`,
      );
      setState((prev) => ({
        ...prev,
        locationSearchData: response.data,
        isLoading: { ...prev.isLoading, locationSearch: false },
      }));

      return response.data;
    } catch (error) {
      console.error("Error Fetching Location Search Data:", error.message);
      setState((prev) => ({
        ...prev,
        isLoading: { ...prev.isLoading, locationSearch: false },
        errors: { ...prev.errors, locationSearch: error.message },
      }));
      return null;
    }
  }, []);

  // Fetch all data in parallel
  const fetchAllData = useCallback(async () => {
    // Run all fetch operations concurrently
    await Promise.all([
      fetchForecastData(),
      fetchAirPollutionData(),
      fetchDailyForecastData(),
      fetchUVData(),
    ]);
  }, [
    fetchForecastData,
    fetchAirPollutionData,
    fetchDailyForecastData,
    fetchUVData,
  ]);

  // Initial data fetch on mount
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  return (
    <GlobalContext.Provider value={state}>
      <GlobalContextUpdate.Provider
        value={{
          fetchForecastData,
          fetchAirPollutionData,
          fetchDailyForecastData,
          fetchUVData,
          fetchLocationSearchData,
          fetchAllData,
          setActiveCityCoords,
        }}
      >
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
