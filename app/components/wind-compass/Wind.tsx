"use client";

import { wind } from "@/app/utils/icons";
import { useGlobalContext } from "@/app/context/global-context";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

/**
 * Wind Compass Component
 *
 * Visualizes wind direction and speed using an interactive compass with animated elements.
 *
 * Features:
 * - Displays a compass with an arrow pointing in the current wind direction
 * - Shows wind speed in km/h in the center of the compass
 * - Implements smooth arrow rotation animations using GSAP
 * - Handles loading, error, and empty data states appropriately
 *
 * Implementation notes:
 * - Uses GSAP for smooth arrow rotation with elastic easing for a natural feel
 * - Converts wind speed from m/s (API default) to km/h for better readability
 * - Wind direction arrow points in the direction FROM which the wind is blowing
 * - Uses SVG images for compass body and directional arrow
 *
 * Animation details:
 * - Arrow rotation is triggered whenever wind direction changes
 * - Animation uses elastic easing for a realistic compass movement
 * - Transform origin is set to center to ensure proper rotation
 *
 * Visual presentation:
 * - Displays a wind icon alongside the title
 * - Shows the compass with directional markers (N,S,E,W)
 * - Dynamically updates wind speed in the center
 */

const Wind = () => {
  const { forecastData, isLoading, errors } = useGlobalContext();
  const arrowContainerRef = useRef(null);

  // Extract wind data from forecast
  const windSpeed = forecastData?.wind?.speed;
  const windDir = forecastData?.wind?.deg;

  // Animate the arrow using GSAP when wind direction changes
  useEffect(() => {
    if (
      windDir !== undefined &&
      windDir !== null &&
      arrowContainerRef.current
    ) {
      // Create smooth animation to the new wind direction
      gsap.to(arrowContainerRef.current, {
        rotation: windDir,
        duration: 2,
        ease: "elastic.out(1, 0.5)", // Elastic effect with bounce
        transformOrigin: "center center",
      });
    }
  }, [windDir]); // Re-run when wind direction changes

  // Show loading state when data is being fetched
  if (isLoading?.forecast) {
    return (
      <div className="dark:bg-dark-grey relative h-[12rem] overflow-hidden rounded-lg border p-4 shadow-sm dark:shadow-none">
        <Skeleton className="absolute inset-0 h-full w-full" />
      </div>
    );
  }

  // Show error state if there was an error
  if (errors?.forecast) {
    return (
      <div className="dark:bg-dark-grey flex h-[12rem] flex-col items-center justify-center rounded-lg border px-4 shadow-sm dark:shadow-none">
        <p className="text-red-500">Unable to load wind data</p>
      </div>
    );
  }

  // Check if we have the required data
  if (
    !forecastData ||
    !windSpeed ||
    windDir === undefined ||
    windDir === null
  ) {
    return (
      <div className="dark:bg-dark-grey flex h-[12rem] flex-col items-center justify-center rounded-lg border px-4 shadow-sm dark:shadow-none">
        <p className="text-muted-foreground text-sm font-medium">
          Wind data is currently unavailable. Please check back later.
        </p>
      </div>
    );
  }

  // Calculate proper wind speed display value
  // Convert m/s to km/h if needed (OpenWeatherMap API returns m/s by default)
  const displayWindSpeed = Math.round(windSpeed * 3.6); // Converted to km/h

  return (
    <div className="dark:bg-dark-grey flex h-[12rem] flex-col justify-between rounded-lg border p-4 shadow-sm dark:shadow-none">
      <h2 className="mb-2 flex items-center gap-2 font-medium">{wind} Wind</h2>

      <div className="flex flex-1 items-center justify-center">
        <div className="relative">
          {/* Compass background */}
          <div className="relative h-[120px] w-[120px]">
            <Image
              src="/compass_body.svg"
              alt="Compass Body"
              width={120}
              height={120}
              quality={100}
              className="h-[120px] w-[120px] dark:opacity-90"
            />

            {/* Arrow - with GSAP animation */}
            <div ref={arrowContainerRef} className="absolute inset-0">
              <div className="absolute top-0 left-1/2 h-full w-3 -translate-x-1/2">
                <Image
                  src="/compass_arrow.svg"
                  alt="Wind Direction"
                  width={12}
                  height={120}
                  quality={100}
                  className="h-auto w-[12px] dark:invert"
                />
              </div>
            </div>
          </div>

          {/* Wind speed */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <p className="text-[13px] font-medium">{displayWindSpeed} km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wind;
