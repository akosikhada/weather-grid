import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import {
  DEFAULT_LATITUDE,
  DEFAULT_LONGITUDE,
} from "@/app/utils/default-application";

/**
 * Weather API endpoint handler
 *
 * Implements a stateless API route that retrieves current weather data from OpenWeatherMap.
 * Using default coordinates from app constants with query parameter fallbacks.
 *
 * Security note: API key is stored in environment variables (.env), never exposed client-side.
 * Error handling: Returns standardized 500 response with message on failure.
 *
 * @param {NextRequest} request - Incoming request object
 * @returns {Promise<NextResponse>} JSON response with weather data or error message
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

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const response = await axios.get(url);

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error Fetching Weather Data", error);

    return new Response("Error Fetching Weather Data", { status: 500 });
  }
}
