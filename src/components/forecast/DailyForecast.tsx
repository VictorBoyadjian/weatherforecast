import { useWeather } from "../../hooks/useWeather";
import HourlyCard from "./HourlyCard";

export default function DailyForecast() {
  const { days, selectedDayIndex, setSelectedDayIndex, loading, cityName } = useWeather();

  if (loading) {
    return (
      <div className="glass-card p-6 animate-pulse h-full">
        <div className="h-6 bg-white/10 rounded w-1/3 mb-4" />
        <div className="flex gap-3 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-28 w-24 bg-white/10 rounded-xl shrink-0" />
          ))}
        </div>
      </div>
    );
  }

  if (!days.length) return null;

  const selectedDay = days[selectedDayIndex];
  const dayLabels = days.map((day) => {
    if (day.dayName === "Aujourd'hui") return "Aujourd'hui";
    return day.dayName.slice(0, 3);
  });

  return (
    <div className="glass-card p-5 h-full flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-white/60 text-sm">
            {selectedDay.dayName} – {cityName}
          </span>
          <h3 className="text-white font-bold text-lg">Prévisions horaires</h3>
        </div>
        <span className="text-white/50 text-sm">00h → 23h</span>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
        {selectedDay.items.map((item) => (
          <HourlyCard key={item.dt} item={item} />
        ))}
      </div>

      <div className="flex gap-2 flex-wrap">
        {days.map((_, index) => (
          <button
            key={days[index].date}
            onClick={() => setSelectedDayIndex(index)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${index === selectedDayIndex
                ? "bg-gray-900/80 text-white"
                : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
              }`}
          >
            {dayLabels[index]}
          </button>
        ))}
      </div>
    </div>
  );
}
