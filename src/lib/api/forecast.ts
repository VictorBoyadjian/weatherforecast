import { API_URL, API_KEY } from "../constants";
import type { ForecastResponse } from "../types/weather";

export async function fetchForecast(
  lat: number,
  lon: number
): Promise<ForecastResponse> {
  const response = await fetch(
    `${API_URL}?lang=fr&units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
  return response.json();
}
