import { useWeather } from "../../hooks/useWeather";
import HourlyCard from "./HourlyCard";
import { getWeatherIconUrl } from "../../lib/helpers";

export default function DailyForecast() {
  const { days, selectedDayIndex, setSelectedDayIndex, loading } = useWeather();

  if (loading) {
    return (
      <div className="flex flex-col bg-gray-900/60 rounded-2xl p-6 animate-pulse h-full">
        <div className="h-6 bg-gray-800 rounded w-1/3 mb-4" />
        <div className="flex gap-3 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-28 w-24 bg-gray-800 rounded-xl shrink-0" />
          ))}
        </div>
      </div>
    );
  }

  if (!days.length) return null;

  const selectedDay = days[selectedDayIndex];

  return (
    <div className="flex flex-col bg-gray-900/60 rounded-2xl p-5 h-full gap-4">
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
        {days.map((day, index) => (
          <button
            key={day.date}
            onClick={() => setSelectedDayIndex(index)}
            className={`flex flex-col items-center gap-1 px-4 py-2.5 rounded-xl shrink-0 transition-all ${
              index === selectedDayIndex
                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                : "bg-gray-800/60 text-gray-400 border border-transparent hover:bg-gray-700/60"
            }`}
          >
            <span className="text-xs font-medium whitespace-nowrap">
              {day.dayName}
            </span>
            <img
              src={getWeatherIconUrl(day.mainWeather.icon)}
              alt={day.mainWeather.description}
              className="w-8 h-8"
            />
            <span className="text-xs">
              {day.minTemp}° / {day.maxTemp}°
            </span>
          </button>
        ))}
      </div>

      <div>
        <h3 className="text-white font-semibold mb-3">
          {selectedDay.dayName}
        </h3>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {selectedDay.items.map((item) => (
            <HourlyCard key={item.dt} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
