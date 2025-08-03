import { useState } from 'react';
import { WeatherSidebar } from '@/components/WeatherSidebar';
import { SearchBar } from '@/components/SearchBar';
import { WeatherCard } from '@/components/WeatherCard';
import { WeatherChart } from '@/components/WeatherChart';
import { ForecastCards } from '@/components/ForecastCards';
import { LocationCards } from '@/components/LocationCards';
import { useWeather, getWeatherBackgroundClass } from '@/hooks/useWeather';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import stormyBg from '@/assets/stormy-bg.jpg';
import sunnyBg from '@/assets/sunny-bg.jpg';
import cloudyBg from '@/assets/cloudy-bg.jpg';

export const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { weather, loading, error, fetchWeather, searchLocations } = useWeather();

  const handleLocationSelect = (location: string) => {
    fetchWeather(location);
  };

  const getBackgroundImage = (condition?: string) => {
    if (!condition) return stormyBg;
    
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('storm') || conditionLower.includes('thunder')) {
      return stormyBg;
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return cloudyBg;
    } else if (conditionLower.includes('snow') || conditionLower.includes('blizzard')) {
      return cloudyBg;
    } else if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
      return sunnyBg;
    } else if (conditionLower.includes('cloud') || conditionLower.includes('overcast')) {
      return cloudyBg;
    }
    
    return stormyBg;
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Error Loading Weather</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-background relative overflow-hidden">
      {/* Dynamic Background */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${getBackgroundImage(weather?.current.condition.text)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
      </div>

      {/* Sidebar */}
      <div className="relative z-10">
        <WeatherSidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 relative z-10">
        {/* Header */}
        <header className="p-6 border-b border-glass-border bg-glass-bg backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-foreground"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Weather Dashboard</h1>
                <p className="text-muted-foreground">
                  {weather ? new Date(weather.location.localtime).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'Loading...'}
                </p>
              </div>
            </div>
            
            <SearchBar 
              onLocationSelect={handleLocationSelect}
              onSearch={searchLocations}
            />
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {loading ? (
            <LoadingSpinner />
          ) : weather ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {/* Left Column - Main Weather */}
              <div className="lg:col-span-2 space-y-6">
                <WeatherCard weather={weather} />
                <WeatherChart weather={weather} />
                <ForecastCards weather={weather} />
              </div>

              {/* Right Column - Location Cards */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Saved Locations</h3>
                  <LocationCards 
                    currentWeather={weather}
                    onLocationSelect={handleLocationSelect}
                  />
                </div>
              </div>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  );
};