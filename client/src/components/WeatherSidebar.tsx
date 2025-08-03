import { Cloud, Home, MapPin, Settings, TrendingUp, Wind, Droplets, Eye, Thermometer, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';

interface WeatherSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  onSectionClick: (sectionId: string) => void;
}

const navItems = [
  { icon: Home, label: 'Current Weather', sectionId: 'current-weather' },
  { icon: TrendingUp, label: '24-Hour Chart', sectionId: 'hourly-chart' },
  { icon: Calendar, label: '5-Day Forecast', sectionId: 'forecast' },
  { icon: Wind, label: 'Wind Details', sectionId: 'wind-details' },
  { icon: Droplets, label: 'Humidity & Rain', sectionId: 'humidity-details' },
  { icon: Eye, label: 'Visibility', sectionId: 'visibility-details' },
  { icon: Thermometer, label: 'Temperature', sectionId: 'temperature-details' },
  { icon: MapPin, label: 'Saved Locations', sectionId: 'saved-locations' },
];

export const WeatherSidebar = ({ isCollapsed, onToggle, onSectionClick }: WeatherSidebarProps) => {
  const location = useLocation();

  const handleSectionClick = (sectionId: string) => {
    onSectionClick(sectionId);
  };

  return (
    <div
      className={cn(
        'fixed left-0 top-0 h-screen bg-glass-bg backdrop-blur-sm border-r border-glass-border transition-all duration-300 flex flex-col z-50',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo/Brand */}
      <div className="p-4 border-b border-glass-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Cloud className="w-5 h-5 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-foreground font-semibold text-lg">Atmoscope</span>
              <span className="text-muted-foreground text-xs">Professional Weather</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navItems.map((item, index) => {
            const isActive = false; // We'll handle active state differently for sections
            return (
              <button
                key={index}
                onClick={() => handleSectionClick(item.sectionId)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-glow'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-glass-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-primary-foreground">JD</span>
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-foreground font-medium text-sm">John Doe</span>
              <span className="text-muted-foreground text-xs">Weather Enthusiast</span>
            </div>
          )}
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-8 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-glow border-2 border-background"
      >
        <div className={cn(
          'w-2 h-2 bg-primary-foreground rounded-full transition-transform duration-300',
          isCollapsed ? 'rotate-180' : ''
        )} />
      </button>
    </div>
  );
};