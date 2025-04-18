import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

/**
 * Weather API endpoint handler
 *
 * Implements a stateless API route that retrieves current weather data from OpenWeatherMap.
 * Using predefined coordinates for Manila (14.5995, 120.9842).
 *
 * Security note: API key is stored in environment variables, never exposed client-side.
 * Error handling: Returns standardized 500 response with message on failure.
 *
 * @param {NextRequest} request - Incoming request object (unused in current implementation)
 * @returns {Promise<NextResponse>} JSON response with weather data or error message
 *
 * TODO: Extend to accept dynamic coordinates via query parameters
 */

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const lat = 14.65;
    const lon = 120.9667;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const response = await axios.get(url);

    return NextResponse.json(response.data);
  } catch (error) {
    console.log("Error Fetching Weather Data", error);

    return new Response("Error Fetching Weather Data", { status: 500 });
  }
}
