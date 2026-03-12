import { useState } from "react";
import { useWeather } from "../../hooks/useWeather";
import WeatherChart from "./WeatherChart";
import { Thermometer, CloudRain, Wind } from "lucide-react";

const TABS = [
  { id: "temperature", label: "Température", icon: Thermometer },
  { id: "rain", label: "Pluie", icon: CloudRain },
  { id: "wind", label: "Vent", icon: Wind },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function ChartsSection() {
  const [activeTab, setActiveTab] = useState<TabId>("temperature");
  const { days, selectedDayIndex, loading } = useWeather();

  if (loading) {
    return (
      <div className="glass-card p-6 animate-pulse h-full">
        <div className="h-6 bg-white/10 rounded w-1/3 mb-4" />
        <div className="h-64 bg-white/10 rounded" />
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
    }).replace(":", "h");
  });

  const temperatureData = items.map(
    (i) => Math.round(i.main.temp * 10) / 10
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
    <div className="glass-card p-5 gap-4 h-full flex flex-col">
      <div>
        <span className="text-white/60 text-sm">Courbes du jour</span>
        <h3 className="text-white font-bold text-lg">
          Température • Pluie • Vent
        </h3>
      </div>

      <div className="flex gap-2">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === tab.id
                  ? "bg-white/20 text-white border border-white/20"
                  : "text-white/50 hover:text-white/70"
                }`}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="flex-1 min-h-0">
        {activeTab === "temperature" && (
          <WeatherChart
            hours={hours}
            title="Température du jour (°C)"
            series={[
              {
                data: temperatureData,
                label: "Température (°C)",
                color: "#ffffff",
              },
            ]}
          />
        )}
        {activeTab === "rain" && (
          <WeatherChart
            hours={hours}
            title="Précipitations du jour (mm)"
            series={[
              {
                data: rainData,
                label: "Précipitations (mm)",
                color: "#60a5fa",
              },
              {
                data: popData,
                label: "Probabilité (%)",
                color: "#ffffff",
              },
            ]}
          />
        )}
        {activeTab === "wind" && (
          <WeatherChart
            hours={hours}
            title="Vent du jour (km/h)"
            series={[
              {
                data: windData,
                label: "Vent (km/h)",
                color: "#ffffff",
              },
              {
                data: gustData,
                label: "Rafales (km/h)",
                color: "#93c5fd",
              },
            ]}
          />
        )}
      </div>
    </div>
  );
}
