import { Sun, MapPin } from "lucide-react";
import CitySearch from "./CitySearch";
import { useWeather } from "../../hooks/useWeather";

export default function Navbar() {
  const { cityName, country } = useWeather();

  return (
    <nav className="w-full bg-gray-900/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-screen-2xl mx-auto px-6 flex items-center h-16 justify-between">
        <div className="flex items-center gap-3">
          <Sun className="text-yellow-400" size={28} />
          <span className="text-white font-semibold text-lg">Sun Forecast</span>
        </div>
        <div className="flex items-center gap-5">
          <div className="hidden sm:flex items-center gap-2 text-gray-400">
            <MapPin size={16} />
            <span className="text-sm">
              {cityName}, {country}
            </span>
          </div>
          <CitySearch />
        </div>
      </div>
    </nav>
  );
}
