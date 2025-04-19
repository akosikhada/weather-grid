"use client";

import axios from "axios";
import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";

/**
 * Global Weather Context
 *
 * Optimized implementation with:
 * 1. Parallel API fetching for improved performance
 * 2. Loading states to track fetch progress
 * 3. Proper error handling with error states
 * 4. Memoized fetch functions to prevent unnecessary re-renders
 * 5. Consolidated state management for better performance
 */

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [state, setState] = useState({
    forecastData: {},
    airPollutionData: {},
    loading: {
      forecast: false,
      airPollution: false,
    },
    errors: {
      forecast: null,
      airPollution: null,
    },
  });

  // Memoized fetch functions to prevent unnecessary re-renders
  const fetchForecastData = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      loading: { ...prev.loading, forecast: true },
      errors: { ...prev.errors, forecast: null },
    }));

    try {
      const response = await axios.get("/api/weather");
      setState((prev) => ({
        ...prev,
        forecastData: response.data,
        loading: { ...prev.loading, forecast: false },
      }));
      return response.data;
    } catch (error) {
      console.error("Error Fetching Forecast Data:", error.message);
      setState((prev) => ({
        ...prev,
        loading: { ...prev.loading, forecast: false },
        errors: { ...prev.errors, forecast: error.message },
      }));
      return null;
    }
  }, []);

  const fetchAirPollutionData = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      loading: { ...prev.loading, airPollution: true },
      errors: { ...prev.errors, airPollution: null },
    }));

    try {
      const response = await axios.get("/api/pollution");
      setState((prev) => ({
        ...prev,
        airPollutionData: response.data,
        loading: { ...prev.loading, airPollution: false },
      }));
      return response.data;
    } catch (error) {
      console.error("Error Fetching Air Pollution Data:", error.message);
      setState((prev) => ({
        ...prev,
        loading: { ...prev.loading, airPollution: false },
        errors: { ...prev.errors, airPollution: error.message },
      }));
      return null;
    }
  }, []);

  // Fetch all data in parallel
  const fetchAllData = useCallback(async () => {
    // Run both fetch operations concurrently
    await Promise.all([fetchForecastData(), fetchAirPollutionData()]);
  }, [fetchForecastData, fetchAirPollutionData]);

  // Initial data fetch on mount
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  return (
    <GlobalContext.Provider value={state}>
      <GlobalContextUpdate.Provider
        value={{ fetchForecastData, fetchAirPollutionData, fetchAllData }}
      >
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
