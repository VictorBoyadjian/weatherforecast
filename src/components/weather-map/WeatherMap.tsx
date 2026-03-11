import { useState, useMemo } from "react";
import { useWeather } from "../../hooks/useWeather";
import { latLonToTile } from "../../lib/helpers";
import { API_KEY } from "../../lib/constants";
import type { MapLayer } from "../../lib/types/weather";

const LAYERS: { id: MapLayer; label: string }[] = [
  { id: "temp_new", label: "Température" },
  { id: "clouds_new", label: "Nuages" },
  { id: "precipitation_new", label: "Précipitations" },
  { id: "wind_new", label: "Vent" },
  { id: "pressure_new", label: "Pression" },
];

const MAP_TILE_URL = "https://tile.openweathermap.org/map";
const OSM_TILE_URL = "https://tile.openstreetmap.org";
const ZOOM = 6;
const GRID_SIZE = 3;

export default function WeatherMap() {
  const { coordinates, loading } = useWeather();
  const [activeLayer, setActiveLayer] = useState<MapLayer>("temp_new");

  const tiles = useMemo(() => {
    const center = latLonToTile(coordinates.lat, coordinates.lon, ZOOM);
    const offset = Math.floor(GRID_SIZE / 2);
    const result: { x: number; y: number }[] = [];
    for (let dy = -offset; dy <= offset; dy++) {
      for (let dx = -offset; dx <= offset; dx++) {
        result.push({ x: center.x + dx, y: center.y + dy });
      }
    }
    return result;
  }, [coordinates]);

  if (loading) {
    return (
      <div className="flex flex-col bg-gray-900/60 rounded-2xl p-6 animate-pulse h-full">
        <div className="h-6 bg-gray-800 rounded w-1/3 mb-4" />
        <div className="aspect-square bg-gray-800 rounded" />
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-gray-900/60 rounded-2xl p-5 gap-4 h-full">
      <div>
        <span className="text-gray-400 text-sm">Carte météo</span>
        <h3 className="text-white font-semibold">Couverture régionale</h3>
      </div>

      <div className="flex flex-wrap gap-1">
        {LAYERS.map((layer) => (
          <button
            key={layer.id}
            onClick={() => setActiveLayer(layer.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeLayer === layer.id
                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                : "bg-gray-800/60 text-gray-400 border border-transparent hover:text-gray-300"
            }`}
          >
            {layer.label}
          </button>
        ))}
      </div>

      <div className="relative rounded-xl overflow-hidden border border-gray-700/50">
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          }}
        >
          {tiles.map((tile) => (
            <div key={`${tile.x}-${tile.y}`} className="relative aspect-square">
              <img
                src={`${OSM_TILE_URL}/${ZOOM}/${tile.x}/${tile.y}.png`}
                alt=""
                className="w-full h-full block"
                loading="lazy"
                draggable={false}
              />
              <img
                src={`${MAP_TILE_URL}/${activeLayer}/${ZOOM}/${tile.x}/${tile.y}.png?appid=${API_KEY}`}
                alt=""
                className="absolute inset-0 w-full h-full opacity-70"
                loading="lazy"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
