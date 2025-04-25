import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

/**
 * Location Search API endpoint handler
 *
 * Implements a stateless API route that retrieves location data based on a search query
 * from OpenWeatherMap's Geocoding API.
 *
 * Security note: API key is stored in environment variables (.env), never exposed client-side.
 * Error handling: Returns standardized 500 response with message on failure.
 *
 * @param {NextRequest} request - Incoming request object
 * @returns {Promise<NextResponse>} JSON response with location data or error message
 */

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");

    if (!query) {
      return new Response("Search query is required", { status: 400 });
    }

    if (!apiKey) {
      console.error("OpenWeather API key is missing");
      return new Response("Server configuration error", { status: 500 });
    }

    // Using OpenWeatherMap's Geocoding API
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${apiKey}`;

    const response = await axios.get(url);

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error Fetching Location Data", error);

    return new Response("Error Fetching Location Data", { status: 500 });
  }
}
