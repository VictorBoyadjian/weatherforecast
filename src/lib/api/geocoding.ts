import { API_KEY } from "../constants";
import type { GeocodingResult } from "../types/weather";

const GEO_URL = "https://api.openweathermap.org/geo/1.0/direct";

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
