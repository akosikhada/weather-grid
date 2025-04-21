import { NextRequest, NextResponse } from "next/server";
import {
  DEFAULT_LATITUDE,
  DEFAULT_LONGITUDE,
} from "@/app/utils/default-application";

/**
 * Daily Forecast API endpoint handler
 *
 * Implements a stateless API route that retrieves 5-day/3-hour forecast data from OpenWeatherMap.
 * Using default coordinates from app constants with query parameter fallbacks.
 *
 * Security note: API key is stored in environment variables (.env), never exposed client-side.
 * Error handling: Returns standardized 500 response with message on failure.
 * Caching: Uses Next.js revalidate to cache response for 1 hour (3600 seconds)
 *
 * Response includes:
 * - Forecast data in 3-hour intervals for the next 5 days
 * - Temperature, weather conditions, humidity, pressure, etc.
 *
 * @param {NextRequest} request - Incoming request object
 * @returns {Promise<NextResponse>} JSON response with forecast data or error message
 *
 * TODO: Extend to accept dynamic coordinates via query parameters
 */

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const searchParams = request.nextUrl.searchParams;
    // Use constants as fallback values
    const lat = searchParams.get("lat") || DEFAULT_LATITUDE.toString();
    const lon = searchParams.get("lon") || DEFAULT_LONGITUDE.toString();

    if (!apiKey) {
      console.error("OpenWeather API key is missing");
      return new Response("Server configuration error", { status: 500 });
    }

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    // Use Next.js built-in caching with revalidate option
    // This implements Stale-While-Revalidate (SWR) pattern to:
    // 1. Cache responses for 1 hour (3600 seconds)
    // 2. Serve stale data immediately while fetching fresh data in the background
    // 3. Reduce API calls and improve performance without sacrificing data freshness
    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(
        `OpenWeather API responded with status: ${response.status}`,
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching daily forecast", error);
    return new Response("Error fetching daily forecast", { status: 500 });
  }
}
