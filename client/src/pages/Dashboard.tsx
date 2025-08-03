import { useState, useEffect } from 'react';
import { WeatherSidebar } from '@/components/WeatherSidebar';
import { SearchBar } from '@/components/SearchBar';
import { WeatherCard } from '@/components/WeatherCard';
import { WeatherChart } from '@/components/WeatherChart';
import { ForecastCards } from '@/components/ForecastCards';
import { LocationCards } from '@/components/LocationCards';
import { WeatherDetails } from '@/components/WeatherDetails';
import { Footer } from '@/components/Footer';
import { useWeather, getWeatherBackgroundClass } from '@/hooks/useWeather';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { InitialLoadingScreen } from '@/components/InitialLoadingScreen';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showInitialLoading, setShowInitialLoading] = useState(true);
  const { weather, loading, error, fetchWeather, searchLocations } = useWeather();

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem('atmoscope-visited');
    if (hasVisited) {
      setShowInitialLoading(false);
    }
  }, []);

  const handleInitialLoadingComplete = () => {
    localStorage.setItem('atmoscope-visited', 'true');
    setShowInitialLoading(false);
  };

  const handleLocationSelect = (location: string) => {
    fetchWeather(location);
  };

  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const getBackgroundImage = (condition?: string) => {
    if (!condition) return 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg';
    
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('storm') || conditionLower.includes('thunder')) {
      return 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg';
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return 'https://images.pexels.com/photos/531756/pexels-photo-531756.jpeg';
    } else if (conditionLower.includes('snow') || conditionLower.includes('blizzard')) {
      return 'https://images.pexels.com/photos/1571442/pexels-photo-1571442.jpeg';
    } else if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
      return 'https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg';
    } else if (conditionLower.includes('cloud') || conditionLower.includes('overcast')) {
      return 'https://images.pexels.com/photos/531756/pexels-photo-531756.jpeg';
    }
    
    return 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg';
  };

  // Show initial loading screen on first visit
  if (showInitialLoading) {
    return <InitialLoadingScreen onComplete={handleInitialLoadingComplete} />;
  }

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
    <div className="flex min-h-screen w-full bg-background relative overflow-x-hidden">
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
      <WeatherSidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        onSectionClick={handleSectionClick}
      />

      {/* Main Content */}
      <div 
        className={cn(
          "flex-1 relative z-10 transition-all duration-300 flex flex-col min-h-screen",
          // Responsive sidebar margin
          "transition-all duration-300",
          sidebarCollapsed 
            ? "sm:ml-16" 
            : "sm:ml-64",
          "ml-0" // No margin on mobile since sidebar is hidden
        )}
      >
        {/* Header */}
        <header className="p-4 sm:p-6 border-b border-glass-border bg-glass-bg backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <Button
                variant="ghost"
                size="sm"
                className="sm:hidden text-foreground"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-foreground truncate">Atmoscope</h1>
                <p className="text-muted-foreground text-sm hidden sm:block">
                  {weather ? new Date(weather.location.localtime).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'Loading...'}
                </p>
              </div>
            </div>
            
            <div className="w-full sm:w-auto sm:min-w-[300px]">
              <SearchBar 
                onLocationSelect={handleLocationSelect}
                onSearch={searchLocations}
              />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {loading ? (
            <LoadingSpinner />
          ) : weather ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
              {/* Left Column - Main Weather */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                <div id="current-weather">
                  <WeatherCard weather={weather} />
                </div>
                
                <div id="hourly-chart">
                  <WeatherChart weather={weather} />
                </div>
                
                <div id="forecast">
                  <ForecastCards weather={weather} />
                </div>
                
                {/* Weather Details Sections */}
                <WeatherDetails weather={weather} />
              </div>

              {/* Right Column - Location Cards */}
              <div className="space-y-4 sm:space-y-6">
                <div id="saved-locations">
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
        
        {/* Footer - Fixed at bottom */}
        <Footer />
      </div>
    </div>
  );
};