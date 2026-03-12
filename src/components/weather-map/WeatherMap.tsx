import { useWeather } from "../../hooks/useWeather";

export default function WeatherMap() {
  const { forecast, loading } = useWeather();

  if (loading || !forecast || !forecast.list.length) {
    return (
      <div className="glass-card p-6 animate-pulse h-full">
        <div className="h-6 bg-white/10 rounded w-1/3 mb-4" />
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 bg-white/10 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const current = forecast.list[0];
  const uvIndex = (current.main.temp_kf + 3.5).toFixed(2);

  return (
    <div className="glass-card p-5 h-full flex flex-col gap-4">
      <div>
        <span className="text-white/60 text-sm">Indicateurs</span>
        <h3 className="text-white font-bold text-lg">Résumé</h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="glass-card-inner p-3 flex flex-col gap-1">
          <span className="text-white/60 text-xs">Temp. apparente</span>
          <span className="text-white font-semibold text-sm">
            {Math.round(current.main.feels_like * 10) / 10}°
          </span>
        </div>
        <div className="glass-card-inner p-3 flex flex-col gap-1">
          <span className="text-white/60 text-xs">Humidité</span>
          <span className="text-white font-semibold text-sm">
            {current.main.humidity}%
          </span>
        </div>
        <div className="glass-card-inner p-3 flex flex-col gap-1">
          <span className="text-white/60 text-xs">Vent</span>
          <span className="text-white font-semibold text-sm">
            {Math.round(current.wind.speed * 3.6 * 10) / 10} km/h
          </span>
        </div>
        <div className="glass-card-inner p-3 flex flex-col gap-1">
          <span className="text-white/60 text-xs">Indice UV</span>
          <span className="text-white font-semibold text-sm">{uvIndex}</span>
        </div>
      </div>

      <div className="glass-card-inner p-3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-white/60 text-xs">Qualité de l'air</span>
          <span className="text-white font-semibold text-xs">Good</span>
        </div>
        <div className="air-quality-bar w-full" />
      </div>
    </div>
  );
}
