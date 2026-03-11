import {
  createContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type {
  ForecastResponse,
  DayForecast,
  GeocodingResult,
} from "../lib/types/weather";
import { fetchForecast } from "../lib/api/forecast";
import { searchCities } from "../lib/api/geocoding";
import { groupForecastByDay } from "../lib/helpers";

type WeatherContextType = {
  forecast: ForecastResponse | null;
  days: DayForecast[];
  selectedDayIndex: number;
  setSelectedDayIndex: (index: number) => void;
  cityName: string;
  country: string;
  coordinates: { lat: number; lon: number };
  loading: boolean;
  error: string | null;
  searchForCities: (query: string) => Promise<GeocodingResult[]>;
  selectCity: (result: GeocodingResult) => void;
};

const WeatherContext = createContext<WeatherContextType | null>(null);

export { WeatherContext };

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);
  const [days, setDays] = useState<DayForecast[]>([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [cityName, setCityName] = useState("Paris");
  const [country, setCountry] = useState("FR");
  const [coordinates, setCoordinates] = useState({ lat: 48.8566, lon: 2.3522 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadForecast = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchForecast(coordinates.lat, coordinates.lon);
      setForecast(data);
      const grouped = groupForecastByDay(data);
      setDays(grouped);
      if (data.city) {
        setCityName(data.city.name);
        setCountry(data.city.country);
      }
      setSelectedDayIndex(0);
    } catch {
      setError("Impossible de charger les prévisions météo");
    } finally {
      setLoading(false);
    }
  }, [coordinates]);

  useEffect(() => {
    loadForecast();
  }, [loadForecast]);

  const searchForCities = useCallback(async (query: string) => {
    return searchCities(query);
  }, []);

  const selectCity = useCallback((result: GeocodingResult) => {
    setCityName(result.name);
    setCountry(result.country);
    setCoordinates({ lat: result.lat, lon: result.lon });
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        forecast,
        days,
        selectedDayIndex,
        setSelectedDayIndex,
        cityName,
        country,
        coordinates,
        loading,
        error,
        searchForCities,
        selectCity,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}
