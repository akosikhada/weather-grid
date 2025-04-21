"use client";

import { useGlobalContext } from "@/app/context/global-context";
import { sun } from "@/app/utils/icons";
import React from "react";
import { UvProgress } from "../uv-progress/UvProgress";

/**
 * UV Index Component
 *
 * Displays the current UV index with a visual indicator and protection recommendations.
 * Data is sourced from the Open-Meteo API via our global context.
 */

const UvIndex = () => {
  const { uvData, loading, errors } = useGlobalContext();

  // Show loading state
  if (loading?.uv) {
    return (
      <div className="dark:bg-dark-grey flex h-[12rem] flex-col items-center justify-center gap-3 rounded-lg border p-4 shadow-sm dark:shadow-none">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
        <p className="text-muted-foreground text-sm font-medium">
          Loading UV data...
        </p>
      </div>
    );
  }

  // Show error state
  if (errors?.uv) {
    return (
      <div className="dark:bg-dark-grey flex h-[12rem] flex-col items-center justify-center gap-3 rounded-lg border p-4 shadow-sm dark:shadow-none">
        <p className="text-destructive text-sm font-medium">
          Error loading UV data: {errors.uv}
        </p>
      </div>
    );
  }

  if (!uvData || !uvData.daily) {
    return (
      <div className="dark:bg-dark-grey flex h-[12rem] flex-col items-center justify-center gap-3 rounded-lg border p-4 shadow-sm dark:shadow-none">
        <p className="text-muted-foreground text-sm font-medium">
          UV Index data unavailable
        </p>
      </div>
    );
  }

  const { daily } = uvData;
  const { uv_index_max } = daily;
  const uvDataMax = uv_index_max[0].toFixed(0);

  /**
   * UV Index reference data
   *
   * Maps UV index values to standardized categories with:
   * - text: The category label
   * - description: Clear description with explicit UV range and health recommendations
   * - color: Appropriate color class for the category
   *
   * Based on WHO and EPA standard UV index categories
   */

  const uvDataCategory = (uvData: number) => {
    if (uvData <= 2) {
      return {
        text: "Low",
        description: "Safe for most people.",
        color: "text-emerald-400",
      };
    } else if (uvData <= 5) {
      return {
        text: "Moderate",
        description: "Use sunscreen and wear a hat.",
        color: "text-amber-300",
      };
    } else if (uvData <= 7) {
      return {
        text: "High",
        description: "Limit time in the sun and use sunscreen.",
        color: "text-amber-500",
      };
    } else if (uvData <= 10) {
      return {
        text: "Very High",
        description: "Stay in shade during midday.",
        color: "text-rose-400",
      };
    } else {
      return {
        text: "Extreme",
        description: "Avoid sun and stay indoors if possible.",
        color: "text-indigo-400",
      };
    }
  };

  const category = uvDataCategory(Number(uvDataMax));

  // Calculate Progress UV Index by dividing the UV Index by 14 and multiplying by 100
  const uvProgressPercentage = (Number(uvDataMax) / 14) * 100;

  return (
    <div className="dark:bg-dark-grey flex h-[12rem] flex-col justify-between rounded-lg border p-4 shadow-sm dark:shadow-none">
      <h2 className="flex items-center gap-2 font-medium">{sun} UV Index</h2>
      <div className="flex flex-col items-center justify-center">
        <span className="text-3xl font-bold">{uvDataMax}</span>
        <span className={`${category.color} text-base`}>
          --- {category.text} ---
        </span>
      </div>
      <div className="w-full">
        <UvProgress
          value={uvProgressPercentage}
          max={14}
          className="progress"
        />
      </div>
      <p className="text-sm">{category.description}</p>
    </div>
  );
};

export default UvIndex;
