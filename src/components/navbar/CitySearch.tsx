import { useState, useRef, useEffect } from "react";
import { Search, Loader2, LocateFixed } from "lucide-react";
import { useWeather } from "../../hooks/useWeather";
import type { GeocodingResult } from "../../lib/types/weather";

export default function CitySearch() {
  const { searchForCities, selectCity, locateUser, locating } = useWeather();
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
    <div ref={containerRef} className="relative">
      <div className="flex items-center bg-gray-800 rounded-lg px-3 border border-gray-700 focus-within:border-gray-500 transition-colors">
        {searching ? (
          <Loader2 className="text-gray-400 shrink-0 animate-spin" size={16} />
        ) : (
          <Search className="text-gray-400 shrink-0" size={16} />
        )}
        <input
          type="text"
          className="bg-transparent text-white text-sm px-2 py-2 outline-none w-52 placeholder:text-gray-500"
          placeholder="Rechercher une ville..."
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => results.length > 0 && setIsOpen(true)}
        />
        <button
          type="button"
          onClick={locateUser}
          disabled={locating}
          className="text-gray-400 hover:text-white transition-colors shrink-0 disabled:opacity-50"
          title="Utiliser ma position"
        >
          {locating ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            <LocateFixed size={16} />
          )}
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-full mt-1 w-full bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50 overflow-hidden">
          {results.map((result, index) => (
            <button
              key={`${result.lat}-${result.lon}-${index}`}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors flex items-center gap-2"
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
