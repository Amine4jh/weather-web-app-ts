import { useEffect, useRef, useState } from "react";
import { searchCities } from "../services/weatherAPI";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  onSearch: (cityName: string) => void;
  onLocationSearch: () => void;
  loading: boolean;
}

interface City {
  name: string;
  state?: string;
  country: string;
}

export default function SearchBar({
  onSearch,
  onLocationSearch,
  loading,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const searchTimeOut = setTimeout(async () => {
      if (query.length > 2) {
        setSearchLoading(true);
        try {
          const result = await searchCities(query);
          setSuggestions(result);
          setShowSuggestions(true);
        } catch (err) {
          console.error("Search failed:", err);
        } finally {
          setSearchLoading(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);
    return () => clearTimeout(searchTimeOut);
  }, [query]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery("");
      setShowSuggestions(false);
    }
  };

  const handleSuggestionsClick = (city: City) => {
    const cityName = city.name ? `${city.name}, ${city.state}` : city.name;
    onSearch(cityName);
    setQuery("");
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-2xl" ref={searchRef}>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl animate-fade-in-up"
      >
        <div className="relative">
          <input
            disabled={loading}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter city name..."
            className="w-full px-6 py-4 pr-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 shadow-lg"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-xl bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
            onClick={onLocationSearch}
            disabled={loading}
          >
            <FiSearch className="w-5 h-5 text-white" />
          </button>
        </div>
      </form>
      {/* Conditional Rendering */}
      {showSuggestions && (suggestions.length > 0 || searchLoading) && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50">
          {searchLoading ? (
            <div className="p-6 text-center text-white/70">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-white/30 border-t-white mx-auto"></div>
              <p>Search Cities.....</p>
            </div>
          ) : (
            suggestions.map((city, index) => (
              <button
                key={`${city.name}-${city.country}-${index}`}
                onClick={() => handleSuggestionsClick(city)}
                className="w-full px-6 py-4 text-left hover:bg-white/10 transition-all duration-200 flex items-center justify-between group border-b border-white/10 last:border-b-0"
              >
                <div>
                  <div className="font-medium text-white group-hover:text-white/90">
                    {city.name}
                    {/* Condtional Rendering */}
                    {city.state && <span>, {city.state}</span>}
                  </div>
                  <div className="text-sm text-white/60">{city.country}</div>
                </div>
                <FiSearch className="w-4 h-4 text-white/40 group-hover:text-white/60 transition-all" />
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
