import type { ForecastItem } from "../../lib/types/weather";
import { getWeatherIconUrl, formatHour } from "../../lib/helpers";

type HourlyCardProps = {
  item: ForecastItem;
};

export default function HourlyCard({ item }: HourlyCardProps) {
  return (
    <div className="flex flex-col items-center gap-1.5 bg-gray-800/60 rounded-xl px-4 py-3 shrink-0 min-w-[90px]">
      <span className="text-xs text-gray-400 font-medium">
        {formatHour(item.dt_txt)}
      </span>
      <img
        src={getWeatherIconUrl(item.weather[0].icon)}
        alt={item.weather[0].description}
        className="w-10 h-10"
      />
      <span className="text-white font-semibold text-sm">
        {Math.round(item.main.temp)}°C
      </span>
      <span className="text-xs text-blue-400">
        {Math.round(item.pop * 100)}%
      </span>
    </div>
  );
}
