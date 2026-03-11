import { useWeather } from "../../hooks/useWeather";
import {
  getWeatherIconUrl,
  formatTime,
  capitalize,
  windDegToDirection,
} from "../../lib/helpers";
import MetricCard from "./MetricCard";
import {
  Thermometer,
  Droplets,
  Wind,
  Gauge,
  Eye,
  Sunrise,
  Sunset,
  ThermometerSnowflake,
} from "lucide-react";

export default function CurrentWeatherCard() {
  const { forecast, loading } = useWeather();

  if (loading || !forecast || !forecast.list.length) {
    return (
      <div className="flex flex-col bg-gray-900/60 rounded-2xl p-6 animate-pulse h-full">
        <div className="h-8 bg-gray-800 rounded w-1/2 mb-4" />
        <div className="h-20 bg-gray-800 rounded mb-4" />
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-16 bg-gray-800 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const current = forecast.list[0];
  const { city } = forecast;

  return (
    <div className="flex flex-col bg-gray-900/60 rounded-2xl p-5 h-full gap-4">
      <div className="flex items-center gap-3 bg-gradient-to-br from-gray-800/80 to-gray-700/40 rounded-xl p-4">
        <img
          src={getWeatherIconUrl(current.weather[0].icon)}
          alt={current.weather[0].description}
          className="w-20 h-20"
        />
        <div className="flex flex-col">
          <span className="text-4xl font-bold text-white">
            {Math.round(current.main.temp)}°C
          </span>
          <span className="text-gray-400 text-sm">
            {capitalize(current.weather[0].description)}
          </span>
          <span className="text-gray-500 text-xs mt-1">
            Ressenti {Math.round(current.main.feels_like)}°C
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <MetricCard
          icon={<ThermometerSnowflake size={18} />}
          label="Min"
          value={`${Math.round(current.main.temp_min)}°C`}
        />
        <MetricCard
          icon={<Thermometer size={18} />}
          label="Max"
          value={`${Math.round(current.main.temp_max)}°C`}
        />
        <MetricCard
          icon={<Sunrise size={18} />}
          label="Lever"
          value={formatTime(city.sunrise)}
        />
        <MetricCard
          icon={<Sunset size={18} />}
          label="Coucher"
          value={formatTime(city.sunset)}
        />
        <MetricCard
          icon={<Droplets size={18} />}
          label="Humidité"
          value={`${current.main.humidity}%`}
        />
        <MetricCard
          icon={<Wind size={18} />}
          label="Vent"
          value={`${Math.round(current.wind.speed * 3.6)} km/h ${windDegToDirection(current.wind.deg)}`}
        />
        <MetricCard
          icon={<Gauge size={18} />}
          label="Pression"
          value={`${current.main.pressure} hPa`}
        />
        <MetricCard
          icon={<Eye size={18} />}
          label="Visibilité"
          value={`${(current.visibility / 1000).toFixed(1)} km`}
        />
      </div>
    </div>
  );
}
