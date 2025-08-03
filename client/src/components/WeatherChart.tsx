import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { WeatherData } from '@/hooks/useWeather';

interface WeatherChartProps {
  weather: WeatherData;
}

export const WeatherChart = ({ weather }: WeatherChartProps) => {
  // Get today's hourly data for the chart
  const todayData = weather.forecast.forecastday[0]?.hour || [];
  
  const chartData = todayData.map((hour) => ({
    time: new Date(hour.time).toLocaleTimeString('en-US', { 
      hour: 'numeric',
      hour12: true 
    }),
    temperature: hour.temp_c,
    humidity: hour.humidity,
    pressure: hour.pressure_mb / 10, // Scale down for better visualization
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-glass-bg backdrop-blur-sm border border-glass-border rounded-lg p-3 shadow-elevated">
          <p className="text-foreground font-medium">{label}</p>
          <p className="text-primary">
            Temperature: {payload[0].value}°C
          </p>
          <p className="text-accent">
            Humidity: {payload[1].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gradient-card backdrop-blur-sm border border-glass-border rounded-2xl p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-foreground">24-Hour Forecast</h3>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-muted-foreground">Temperature</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span className="text-muted-foreground">Humidity</span>
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--glass-border))" />
            <XAxis 
              dataKey="time" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="temperature" 
              stroke="hsl(var(--primary))" 
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="humidity" 
              stroke="hsl(var(--accent))" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2, r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};