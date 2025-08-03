import { useState } from 'react';
import { MapPin, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WeatherData } from '@/hooks/useWeather';

interface LocationCard {
  id: string;
  name: string;
  country: string;
  temp: number;
  condition: string;
  icon: string;
}

interface LocationCardsProps {
  currentWeather?: WeatherData;
  onLocationSelect: (location: string) => void;
}

export const LocationCards = ({ currentWeather, onLocationSelect }: LocationCardsProps) => {
  const [savedLocations, setSavedLocations] = useState<LocationCard[]>([
    {
      id: '1',
      name: 'North Jakarta',
      country: 'Indonesia',
      temp: 12,
      condition: 'Mostly Sunny',
      icon: '//cdn.weatherapi.com/weather/64x64/day/116.png'
    },
    {
      id: '2',
      name: 'Bandung',
      country: 'Indonesia',
      temp: 10,
      condition: 'Cloudy',
      icon: '//cdn.weatherapi.com/weather/64x64/day/119.png'
    },
    {
      id: '3',
      name: 'South Jakarta',
      country: 'Indonesia',
      temp: 14,
      condition: 'Sunny',
      icon: '//cdn.weatherapi.com/weather/64x64/day/113.png'
    }
  ]);

  const removeLocation = (id: string) => {
    setSavedLocations(locations => locations.filter(loc => loc.id !== id));
  };

  const handleLocationClick = (locationName: string) => {
    onLocationSelect(locationName);
  };

  return (
    <div className="space-y-4">
      {/* Current Location */}
      {currentWeather && (
        <div className="bg-gradient-card backdrop-blur-sm border border-glass-border rounded-xl p-4 shadow-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-primary" />
              <div>
                <div className="font-medium text-foreground">
                  {currentWeather.location.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {currentWeather.location.country}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {currentWeather.current.condition.text}
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-xl font-bold text-foreground">
                {Math.round(currentWeather.current.temp_c)}°C
              </div>
              <img 
                src={`https:${currentWeather.current.condition.icon}`}
                alt={currentWeather.current.condition.text}
                className="w-8 h-8 ml-auto"
              />
            </div>
          </div>
        </div>
      )}

      {/* Saved Locations */}
      {savedLocations.map((location, index) => (
        <div 
          key={location.id}
          className="bg-gradient-card backdrop-blur-sm border border-glass-border rounded-xl p-4 shadow-card hover:bg-secondary/20 transition-all duration-200 cursor-pointer group animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
          onClick={() => handleLocationClick(location.name)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {location.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {location.country}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {location.condition}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="text-xl font-bold text-foreground">
                  {location.temp}°C
                </div>
                <img 
                  src={`https:${location.icon}`}
                  alt={location.condition}
                  className="w-8 h-8 ml-auto"
                />
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-muted-foreground hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  removeLocation(location.id);
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Add Location Button */}
      <div className="bg-gradient-card backdrop-blur-sm border border-glass-border border-dashed rounded-xl p-4 shadow-card hover:bg-secondary/20 transition-all duration-200 cursor-pointer group">
        <div className="flex items-center justify-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add Location</span>
        </div>
      </div>
    </div>
  );
};