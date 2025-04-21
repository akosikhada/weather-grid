import { NextRequest, NextResponse } from "next/server";
import {
  DEFAULT_LATITUDE,
  DEFAULT_LONGITUDE,
} from "@/app/utils/default-application";

/**
 * UV Index API Endpoint
 *
 * This endpoint retrieves UV index forecasting data from the Open-Meteo API.
 * It serves as a proxy to avoid exposing API calls directly from the client.
 * Using default coordinates from app constants with query parameter fallbacks.
 *
 * Features:
 * - Accepts latitude and longitude parameters via query string
 * - Returns both standard UV index and clear sky UV index maximum values
 * - Uses Next.js revalidation for efficient caching (15 minutes/900 seconds)
 * - Returns standardized error responses
 *
 * Response includes:
 * - Daily UV index maximum values
 * - Clear sky UV index maximum values
 * - Timezone information
 *
 * @param {NextRequest} request - The incoming request with lat/lon query parameters
 * @returns {Promise<NextResponse>} JSON response with UV data or error message
 */

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    // Use constants as fallback values
    const lat = searchParams.get("lat") || DEFAULT_LATITUDE.toString();
    const lon = searchParams.get("lon") || DEFAULT_LONGITUDE.toString();

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`;

    const response = await fetch(url, {
      next: { revalidate: 900 }, // Cache for 15 minutes
    });

    if (!response.ok) {
      throw new Error(
        `Open-Meteo API responded with status: ${response.status}`,
      );
    }

    const uvData = await response.json();

    return NextResponse.json(uvData);
  } catch (error) {
    console.error("Error fetching UV data", error);

    return new Response("Error fetching UV data", { status: 500 });
  }
}
