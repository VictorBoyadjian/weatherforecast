import { API_KEY } from "../constants";
import type { GeocodingResult } from "../types/weather";

const GEO_URL = "https://api.openweathermap.org/geo/1.0/direct";
const REVERSE_GEO_URL = "https://api.openweathermap.org/geo/1.0/reverse";

export async function searchCities(
  query: string
): Promise<GeocodingResult[]> {
  if (!query.trim()) return [];
  const response = await fetch(
    `${GEO_URL}?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
  );
  if (!response.ok) return [];
  return response.json();
}

export async function reverseGeocode(
  lat: number,
  lon: number
): Promise<GeocodingResult | null> {
  const response = await fetch(
    `${REVERSE_GEO_URL}?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
  );
  if (!response.ok) return null;
  const results: GeocodingResult[] = await response.json();
  return results[0] ?? null;
}
