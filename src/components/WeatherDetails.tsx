import { WeatherData } from '@/hooks/useWeather';
import { Wind, Droplets, Eye, Thermometer, Gauge, Sun, CloudRain } from 'lucide-react';

interface WeatherDetailsProps {
  weather: WeatherData;
}

export const WeatherDetails = ({ weather }: WeatherDetailsProps) => {
  const { current } = weather;

  return (
    <div className="space-y-8">
      {/* Wind Details Section */}
      <section id="wind-details" className="bg-gradient-card backdrop-blur-sm border border-glass-border rounded-2xl p-6 shadow-card">
        <div className="flex items-center gap-3 mb-6">
          <Wind className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">Wind Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
              <span className="text-muted-foreground">Wind Speed</span>
              <span className="text-foreground font-semibold">{current.wind_kph} km/h</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
              <span className="text-muted-foreground">Wind Direction</span>
              <span className="text-foreground font-semibold">{current.wind_dir}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-32 border-2 border-primary/30 rounded-full flex items-center justify-center">
              <Wind className="w-8 h-8 text-primary" />
              <div className="absolute top-2 text-xs text-muted-foreground">N</div>
              <div className="absolute bottom-2 text-xs text-muted-foreground">S</div>
              <div className="absolute left-2 text-xs text-muted-foreground">W</div>
              <div className="absolute right-2 text-xs text-muted-foreground">E</div>
            </div>
          </div>
        </div>
      </section>

      {/* Humidity & Precipitation Details */}
      <section id="humidity-details" className="bg-gradient-card backdrop-blur-sm border border-glass-border rounded-2xl p-6 shadow-card">
        <div className="flex items-center gap-3 mb-6">
          <Droplets className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">Humidity & Precipitation</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-secondary/30 rounded-lg text-center">
            <Droplets className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{current.humidity}%</div>
            <div className="text-sm text-muted-foreground">Humidity</div>
          </div>
          
          <div className="p-4 bg-secondary/30 rounded-lg text-center">
            <CloudRain className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{current.cloud}%</div>
            <div className="text-sm text-muted-foreground">Cloud Cover</div>
          </div>
          
          <div className="p-4 bg-secondary/30 rounded-lg text-center">
            <Gauge className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{current.pressure_mb}</div>
            <div className="text-sm text-muted-foreground">Pressure (mb)</div>
          </div>
        </div>
      </section>

      {/* Visibility Details */}
      <section id="visibility-details" className="bg-gradient-card backdrop-blur-sm border border-glass-border rounded-2xl p-6 shadow-card">
        <div className="flex items-center gap-3 mb-6">
          <Eye className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">Visibility Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
              <span className="text-muted-foreground">Current Visibility</span>
              <span className="text-foreground font-semibold">{current.vis_km} km</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
              <span className="text-muted-foreground">UV Index</span>
              <span className="text-foreground font-semibold">{current.uv}</span>
            </div>
          </div>
          
          <div className="p-4 bg-secondary/30 rounded-lg">
            <div className="text-sm text-muted-foreground mb-2">Visibility Quality</div>
            <div className="w-full bg-secondary rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((current.vis_km / 10) * 100, 100)}%` }}
              ></div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {current.vis_km > 8 ? 'Excellent' : current.vis_km > 5 ? 'Good' : current.vis_km > 2 ? 'Fair' : 'Poor'}
            </div>
          </div>
        </div>
      </section>

      {/* Temperature Details */}
      <section id="temperature-details" className="bg-gradient-card backdrop-blur-sm border border-glass-border rounded-2xl p-6 shadow-card">
        <div className="flex items-center gap-3 mb-6">
          <Thermometer className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">Temperature Analysis</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-secondary/30 rounded-lg text-center">
            <Thermometer className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{Math.round(current.temp_c)}°C</div>
            <div className="text-sm text-muted-foreground">Current</div>
          </div>
          
          <div className="p-4 bg-secondary/30 rounded-lg text-center">
            <Sun className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{Math.round(current.feelslike_c)}°C</div>
            <div className="text-sm text-muted-foreground">Feels Like</div>
          </div>
          
          <div className="p-4 bg-secondary/30 rounded-lg text-center">
            <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-red-500 rounded-full"></div>
            </div>
            <div className="text-2xl font-bold text-foreground">{Math.round(current.temp_f)}°F</div>
            <div className="text-sm text-muted-foreground">Fahrenheit</div>
          </div>
        </div>
      </section>
    </div>
  );
};