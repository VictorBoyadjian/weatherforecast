import { useState } from "react";
import { useWeather } from "../../hooks/useWeather";
import WeatherChart from "./WeatherChart";

const TABS = [
  { id: "temperature", label: "Température" },
  { id: "rain", label: "Pluie" },
  { id: "wind", label: "Vent" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function ChartsSection() {
  const [activeTab, setActiveTab] = useState<TabId>("temperature");
  const { days, selectedDayIndex, loading } = useWeather();

  if (loading) {
    return (
      <div className="flex flex-col bg-gray-900/60 rounded-2xl p-6 animate-pulse h-full">
        <div className="h-6 bg-gray-800 rounded w-1/3 mb-4" />
        <div className="h-64 bg-gray-800 rounded" />
      </div>
    );
  }

  const selectedDay = days[selectedDayIndex];
  if (!selectedDay) return null;

  const items = selectedDay.items;
  const hours = items.map((i) => {
    const date = new Date(i.dt_txt);
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  });

  const temperatureData = items.map(
    (i) => Math.round(i.main.temp * 10) / 10
  );
  const feelsLikeData = items.map(
    (i) => Math.round(i.main.feels_like * 10) / 10
  );
  const rainData = items.map((i) => i.rain?.["3h"] ?? 0);
  const popData = items.map((i) => Math.round(i.pop * 100));
  const windData = items.map(
    (i) => Math.round(i.wind.speed * 3.6 * 10) / 10
  );
  const gustData = items.map(
    (i) => Math.round((i.wind.gust ?? i.wind.speed) * 3.6 * 10) / 10
  );

  return (
    <div className="flex flex-col bg-gray-900/60 rounded-2xl p-5 gap-4 h-full">
      <div>
        <span className="text-gray-400 text-sm">Courbes du jour</span>
        <h3 className="text-white font-semibold">{selectedDay.dayName}</h3>
      </div>

      <div className="flex bg-gray-800/60 rounded-xl p-1 gap-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-gray-700 text-white"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 min-h-0">
        {activeTab === "temperature" && (
          <WeatherChart
            hours={hours}
            series={[
              {
                data: temperatureData,
                label: "Température (°C)",
                color: "#f97316",
              },
              {
                data: feelsLikeData,
                label: "Ressenti (°C)",
                color: "#facc15",
              },
            ]}
          />
        )}
        {activeTab === "rain" && (
          <WeatherChart
            hours={hours}
            series={[
              {
                data: rainData,
                label: "Précipitations (mm)",
                color: "#3b82f6",
              },
              {
                data: popData,
                label: "Probabilité (%)",
                color: "#60a5fa",
              },
            ]}
          />
        )}
        {activeTab === "wind" && (
          <WeatherChart
            hours={hours}
            series={[
              {
                data: windData,
                label: "Vent (km/h)",
                color: "#10b981",
              },
              {
                data: gustData,
                label: "Rafales (km/h)",
                color: "#6ee7b7",
              },
            ]}
          />
        )}
      </div>
    </div>
  );
}
