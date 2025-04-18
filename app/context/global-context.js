"use client";

import axios from "axios";
import React from "react";

/**
 * Global Weather Context
 *
 * Implements a React Context-based state management system with:
 * 1. Data provider - Exposes current forecast data to the component tree
 * 2. Action provider - Exposes fetch method for data refresh
 *
 * Architecture follows separation of concerns principles:
 * - Read-only data context (GlobalContext)
 * - Action-only context (GlobalContextUpdate)
 *
 * This separation prevents unnecessary re-renders when only actions are needed,
 * while maintaining unidirectional data flow.
 *
 * Features:
 * - Auto-bootstraps with initial API call on mount
 * - Centralizes weather API communication
 * - Provides hooks for consuming components:
 *   → useGlobalContext(): Access current weather data
 *   → useGlobalContextUpdate(): Access data refresh function
 *
 * Error handling includes graceful API failure recovery with console logging.
 */

const GlobalContext = React.createContext();
const GlobalContextUpdate = React.createContext();

export const GlobalContextProvider = ({ children }) => {
  const [forecastData, setForecastData] = React.useState({});
  const fetchForecastData = async () => {
    try {
      const response = await axios.get("/api/weather");

      setForecastData(response.data);
    } catch (error) {
      console.log("Error Fetching Forecast Data", error.message);
    }
  };

  React.useEffect(() => {
    fetchForecastData();
  }, []);

  return (
    <GlobalContext.Provider value={forecastData}>
      <GlobalContextUpdate.Provider value={fetchForecastData}>
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => React.useContext(GlobalContext);
export const useGlobalContextUpdate = () =>
  React.useContext(GlobalContextUpdate);
