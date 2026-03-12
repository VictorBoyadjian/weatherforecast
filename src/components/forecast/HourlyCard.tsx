import type { ForecastItem } from "../../lib/types/weather";
import { getWeatherIconUrl, formatHour } from "../../lib/helpers";

type HourlyCardProps = {
  item: ForecastItem;
};

export default function HourlyCard({ item }: HourlyCardProps) {
  return (
    <div className="flex flex-col items-center gap-1.5 glass-card-inner rounded-xl px-4 py-3 shrink-0 min-w-[80px]">
      <span className="text-xs text-white/60 font-medium">
        {formatHour(item.dt_txt).replace(":", "h")}
      </span>
      <img
        src={getWeatherIconUrl(item.weather[0].icon)}
        alt={item.weather[0].description}
        className="w-10 h-10"
      />
      <span className="text-white font-semibold text-sm">
        {Math.round(item.main.temp)}°
      </span>
    </div>
  );
}
