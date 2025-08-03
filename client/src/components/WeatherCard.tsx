import { WeatherData } from '@/hooks/useWeather';
import { MapPin, Wind, Droplets, Eye, Thermometer, Gauge } from 'lucide-react';

interface WeatherCardProps {
  weather: WeatherData;
}

export const WeatherCard = ({ weather }: WeatherCardProps) => {
  const { location, current } = weather;

  const weatherDetails = [
    {
      icon: Wind,
      label: 'Wind Speed',
      value: `${current.wind_kph} km/h`,
      direction: current.wind_dir
    },
    {
      icon: Droplets,
      label: 'Humidity',
      value: `${current.humidity}%`
    },
    {
      icon: Eye,
      label: 'Visibility',
      value: `${current.vis_km} km`
    },
    {
      icon: Thermometer,
      label: 'Feels like',
      value: `${Math.round(current.feelslike_c)}°C`
    },
    {
      icon: Gauge,
      label: 'Pressure',
      value: `${current.pressure_mb} mb`
    }
  ];

  return (
    <div className="bg-gradient-card backdrop-blur-sm border border-glass-border rounded-2xl p-6 shadow-card">
      {/* Location */}
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="w-5 h-5 text-primary" />
        <div>
          <h2 className="text-xl font-semibold text-foreground">{location.name}</h2>
          <p className="text-muted-foreground">{location.region}, {location.country}</p>
        </div>
      </div>

      {/* Main Weather Info */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-5xl font-bold text-foreground mb-2">
            {Math.round(current.temp_c)}°C
          </div>
          <div className="text-lg text-muted-foreground">
            {current.condition.text}
          </div>
        </div>
        <div className="w-20 h-20">
          <img 
            src={`https:${current.condition.icon}`} 
            alt={current.condition.text}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 gap-4">
        {weatherDetails.map((detail, index) => (
          <div key={index} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg backdrop-blur-sm">
            <detail.icon className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
              <div className="text-sm text-muted-foreground">{detail.label}</div>
              <div className="font-semibold text-foreground flex items-center gap-1">
                {detail.value}
                {detail.direction && (
                  <span className="text-xs text-muted-foreground">
                    {detail.direction}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* UV Index */}
      <div className="mt-4 p-3 bg-secondary/30 rounded-lg backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">UV Index</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow"></div>
            <span className="font-semibold text-foreground">{current.uv}</span>
          </div>
        </div>
        <div className="w-full bg-secondary rounded-full h-2 mt-2">
          <div 
            className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(current.uv * 10, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};