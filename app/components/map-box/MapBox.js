"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useGlobalContext } from "@/app/context/global-context";
import { Skeleton } from "@/components/ui/skeleton";

// Dynamically import Leaflet components with no SSR to avoid window not defined error
const MapWithNoSSR = dynamic(() => import("./MapContainer"), { ssr: false });

function MapBox() {
  const { forecastData, isLoading, errors } = useGlobalContext();

  // Show loading state
  if (isLoading?.forecast) {
    return (
      <div className="relative h-full flex-1 basis-[50%] overflow-hidden rounded-lg border shadow-sm dark:shadow-none">
        <Skeleton className="absolute inset-0 h-full w-full" />
      </div>
    );
  }

  // Show error state
  if (errors?.forecast) {
    return (
      <div className="dark:bg-dark-grey flex h-full flex-1 basis-[50%] flex-col items-center justify-center gap-3 rounded-lg border p-4 shadow-sm dark:shadow-none">
        <p className="text-destructive text-sm font-medium">
          Error: {errors.forecast}
        </p>
      </div>
    );
  }

  // Validate data integrity before proceeding with map rendering
  if (!forecastData || !forecastData.coord) {
    return (
      <div className="dark:bg-dark-grey flex h-full flex-1 basis-[50%] flex-col items-center justify-center gap-3 rounded-lg border p-4 shadow-sm dark:shadow-none">
        <p className="text-muted-foreground text-sm font-medium">
          Map data is currently unavailable. Please check back later.
        </p>
      </div>
    );
  }

  // Only continue if we have valid coordinates
  const activeCityCords = forecastData.coord;

  return (
    <div className="flex-1 basis-[50%] rounded-lg border">
      <MapWithNoSSR activeCityCords={activeCityCords} />
    </div>
  );
}

export default MapBox;
