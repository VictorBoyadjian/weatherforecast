import { useState, useRef, useEffect } from "react";
import { Search, Loader2, MapPin } from "lucide-react";
import { useWeather } from "../../hooks/useWeather";
import type { GeocodingResult } from "../../lib/types/weather";

export default function CitySearch() {
  const { searchForCities, selectCity, locateUser, locating, cityName } = useWeather();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleChange(value: string) {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (value.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    setSearching(true);
    debounceRef.current = setTimeout(async () => {
      const cities = await searchForCities(value);
      setResults(cities);
      setIsOpen(cities.length > 0);
      setSearching(false);
    }, 400);
  }

  function handleSelect(result: GeocodingResult) {
    selectCity(result);
    setQuery("");
    setResults([]);
    setIsOpen(false);
  }

  return (
    <div ref={containerRef} className="relative flex items-center gap-3">
      <div className="flex-1 flex items-center glass-card px-4 py-2.5 rounded-full">
        {searching ? (
          <Loader2 className="text-white/60 shrink-0 animate-spin" size={18} />
        ) : (
          <Search className="text-white/60 shrink-0" size={18} />
        )}
        <input
          type="text"
          className="bg-transparent text-white text-sm px-3 py-0.5 outline-none flex-1 placeholder:text-white/50"
          placeholder={cityName || "Rechercher une ville..."}
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => results.length > 0 && setIsOpen(true)}
        />
      </div>
      <button
        type="button"
        onClick={() => {
          if (query.length >= 2) {
            handleChange(query);
          }
        }}
        className="bg-gray-900/80 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-900 transition-colors border border-white/10 whitespace-nowrap"
      >
        Rechercher
      </button>
      <button
        type="button"
        onClick={locateUser}
        disabled={locating}
        className="flex items-center gap-2 bg-gray-900/80 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-900 transition-colors border border-white/10 disabled:opacity-50 whitespace-nowrap"
      >
        {locating ? (
          <Loader2 className="animate-spin" size={16} />
        ) : (
          <MapPin size={16} className="text-red-400" />
        )}
        Ma position
      </button>
      {isOpen && (
        <div className="absolute top-full mt-2 left-0 right-0 glass-card shadow-xl z-50 overflow-hidden rounded-xl">
          {results.map((result, index) => (
            <button
              key={`${result.lat}-${result.lon}-${index}`}
              className="w-full text-left px-4 py-2.5 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2"
              onClick={() => handleSelect(result)}
            >
              <span>
                {result.name}
                {result.state ? `, ${result.state}` : ""}, {result.country}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
