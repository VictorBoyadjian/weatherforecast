import { Sun, Home, Map } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import CitySearch from "./CitySearch";

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isMaps = location.pathname === "/maps";

  return (
    <nav className="w-full">
      <div className="max-w-screen-2xl mx-auto px-6 pt-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sun className="text-yellow-400" size={24} />
            <span className="text-white font-bold text-xl italic">Sun Forecast</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${isHome
                  ? "bg-gray-900 text-white"
                  : "bg-gray-900/60 text-white/70 hover:bg-gray-900/80 hover:text-white"
                }`}
            >
              <Home size={16} />
              Accueil
            </Link>
            <Link
              to="/maps"
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${isMaps
                  ? "bg-gray-900 text-white"
                  : "bg-gray-900/60 text-white/70 hover:bg-gray-900/80 hover:text-white"
                }`}
            >
              <Map size={16} />
              Maps
            </Link>
          </div>
        </div>
        {isHome && <CitySearch />}
      </div>
    </nav>
  );
}
