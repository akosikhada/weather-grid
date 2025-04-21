import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import {
  DEFAULT_LATITUDE,
  DEFAULT_LONGITUDE,
} from "@/app/utils/default-application";

/**
 * Air Pollution API endpoint handler
 *
 * Implements a stateless API route that retrieves current air pollution data from OpenWeatherMap.
 * Using default coordinates from app constants with query parameter fallbacks.
 *
 * Security note: API key is stored in environment variables (.env), never exposed client-side.
 * Error handling: Returns standardized 500 response with message on failure.
 *
 * Response includes:
 * - AQI (Air Quality Index) values on a scale of 1-5
 * - Concentration of various pollutants (CO, NO, NO2, O3, SO2, PM2.5, PM10, NH3)
 *
 * @param {NextRequest} request - Incoming request object
 * @returns {Promise<NextResponse>} JSON response with air pollution data or error message
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

    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const response = await axios.get(url);

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching pollution data", error);
    return new Response("Error fetching pollution data", { status: 500 });
  }
}
