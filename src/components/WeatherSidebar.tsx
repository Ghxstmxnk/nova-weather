import { Cloud, Home, MapPin, Settings, TrendingUp, Wind, Droplets, Eye, Thermometer } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WeatherSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { icon: Home, label: 'Dashboard', active: true },
  { icon: MapPin, label: 'Locations', active: false },
  { icon: TrendingUp, label: 'Forecast', active: false },
  { icon: Cloud, label: 'Weather Map', active: false },
  { icon: Wind, label: 'Wind Patterns', active: false },
  { icon: Droplets, label: 'Precipitation', active: false },
  { icon: Eye, label: 'Visibility', active: false },
  { icon: Thermometer, label: 'Temperature', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

export const WeatherSidebar = ({ isCollapsed, onToggle }: WeatherSidebarProps) => {
  return (
    <div
      className={cn(
        'h-screen bg-glass-bg backdrop-blur-sm border-r border-glass-border transition-all duration-300 flex flex-col',
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
              <span className="text-foreground font-semibold text-lg">WeatherDash</span>
              <span className="text-muted-foreground text-xs">Professional Weather</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navItems.map((item, index) => (
            <button
              key={index}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200',
                item.active
                  ? 'bg-primary text-primary-foreground shadow-glow'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && (
                <span className="font-medium">{item.label}</span>
              )}
            </button>
          ))}
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
              <span className="text-muted-foreground text-xs">Premium User</span>
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