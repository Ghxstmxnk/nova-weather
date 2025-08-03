import { useState, useRef, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LocationSuggestion } from '@/hooks/useWeather';

interface SearchBarProps {
  onLocationSelect: (location: string) => void;
  onSearch: (query: string) => Promise<LocationSuggestion[]>;
}

export const SearchBar = ({ onLocationSelect, onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (searchQuery: string) => {
    if (searchQuery.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setLoading(true);
    try {
      const results = await onSearch(searchQuery);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  const handleSuggestionClick = (suggestion: LocationSuggestion) => {
    const locationString = `${suggestion.name}, ${suggestion.region}, ${suggestion.country}`;
    setQuery(locationString);
    onLocationSelect(locationString);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onLocationSelect(query.trim());
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative w-full max-w-lg">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search for a city or location..."
            value={query}
            onChange={handleInputChange}
            className="pl-10 pr-4 py-3 bg-glass-bg backdrop-blur-sm border-glass-border focus:ring-primary focus:border-primary rounded-xl text-black placeholder-muted-foreground"
          />
          {loading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            </div>
          )}
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-2 bg-glass-bg backdrop-blur-sm border border-glass-border rounded-xl shadow-elevated max-h-60 overflow-y-auto"
        >
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.id}
              className="w-full text-left px-4 py-3 hover:bg-secondary/50 focus:bg-secondary/50 focus:outline-none flex items-center gap-3 first:rounded-t-xl last:rounded-b-xl transition-colors"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-foreground font-medium truncate">
                  {suggestion.name}
                </div>
                <div className="text-muted-foreground text-sm truncate">
                  {suggestion.region}, {suggestion.country}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};