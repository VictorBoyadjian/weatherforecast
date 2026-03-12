import { useWeather } from "../../hooks/useWeather";
import {
  getWeatherIconUrl,
  formatTime,
  capitalize,
} from "../../lib/helpers";
import MetricCard from "./MetricCard";

export default function CurrentWeatherCard() {
  const { forecast, loading } = useWeather();

  if (loading || !forecast || !forecast.list.length) {
    return (
      <div className="glass-card p-6 animate-pulse h-full">
        <div className="h-8 bg-white/10 rounded w-1/2 mb-4" />
        <div className="h-20 bg-white/10 rounded mb-4" />
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 bg-white/10 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const current = forecast.list[0];
  const { city } = forecast;

  return (
    <div className="glass-card p-5 h-full flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <span className="text-5xl font-bold text-white">
            {Math.round(current.main.temp)}°C
          </span>
          <span className="text-white/70 text-sm mt-1">
            {capitalize(current.weather[0].description)}
          </span>
        </div>
        <img
          src={getWeatherIconUrl(current.weather[0].icon)}
          alt={current.weather[0].description}
          className="w-16 h-16 ml-auto"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <MetricCard
          label="Min"
          value={`${Math.round(current.main.temp_min)}°`}
        />
        <MetricCard
          label="Max"
          value={`${Math.round(current.main.temp_max)}°`}
        />
        <MetricCard
          label="Levée"
          value={formatTime(city.sunrise)}
        />
        <MetricCard
          label="Couché"
          value={formatTime(city.sunset)}
        />
      </div>
    </div>
  );
}
