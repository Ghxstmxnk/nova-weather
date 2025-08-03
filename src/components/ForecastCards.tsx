import { WeatherData } from '@/hooks/useWeather';
import { Calendar } from 'lucide-react';

interface ForecastCardsProps {
  weather: WeatherData;
}

export const ForecastCards = ({ weather }: ForecastCardsProps) => {
  const forecast = weather.forecast.forecastday.slice(1, 6); // Next 5 days

  const getDayName = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className="bg-gradient-card backdrop-blur-sm border border-glass-border rounded-2xl p-6 shadow-card">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="w-6 h-6 text-primary" />
        <h3 className="text-xl font-semibold text-foreground">5-Day Forecast</h3>
      </div>

      <div className="space-y-4">
        {forecast.map((day, index) => (
          <div 
            key={day.date}
            className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg backdrop-blur-sm hover:bg-secondary/50 transition-colors animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center gap-4">
              <div className="text-center min-w-[3rem]">
                <div className="text-foreground font-medium">
                  {getDayName(day.date)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(day.date).getDate()}
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <img 
                  src={`https:${day.day.condition.icon}`}
                  alt={day.day.condition.text}
                  className="w-8 h-8"
                />
                <div>
                  <div className="text-foreground font-medium">
                    {day.day.condition.text}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Humidity: {day.day.humidity}%
                  </div>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-foreground font-semibold text-lg">
                {Math.round(day.day.maxtemp_c)}°
              </div>
              <div className="text-muted-foreground text-sm">
                {Math.round(day.day.mintemp_c)}°
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};