import { useState, useEffect } from 'react';

const API_KEY = 'fe21d14a5cb44189843174140250208';
const BASE_URL = 'https://api.weatherapi.com/v1';

export interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    localtime: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_mph: number;
    wind_kph: number;
    wind_dir: string;
    pressure_mb: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    vis_km: number;
    uv: number;
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        avgtemp_c: number;
        condition: {
          text: string;
          icon: string;
        };
        humidity: number;
        wind_kph: number;
      };
      hour: Array<{
        time: string;
        temp_c: number;
        condition: {
          text: string;
          icon: string;
        };
        humidity: number;
        wind_kph: number;
        pressure_mb: number;
      }>;
    }>;
  };
}

export interface LocationSuggestion {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
}

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (location: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(location)}&days=7&aqi=yes&alerts=yes`
      );
      
      if (!response.ok) {
        throw new Error('Weather data not found');
      }
      
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const searchLocations = async (query: string): Promise<LocationSuggestion[]> => {
    if (query.length < 3) return [];
    
    try {
      const response = await fetch(
        `${BASE_URL}/search.json?key=${API_KEY}&q=${encodeURIComponent(query)}`
      );
      
      if (!response.ok) return [];
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to search locations:', error);
      return [];
    }
  };

  // Get current location weather on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(`${latitude},${longitude}`);
        },
        () => {
          // Fallback to a default location
          fetchWeather('Jakarta');
        }
      );
    } else {
      fetchWeather('Jakarta');
    }
  }, []);

  return {
    weather,
    loading,
    error,
    fetchWeather,
    searchLocations
  };
};

export const getWeatherBackgroundClass = (condition?: string) => {
  if (!condition) return 'bg-gradient-stormy';
  
  const conditionLower = condition.toLowerCase();
  
  if (conditionLower.includes('storm') || conditionLower.includes('thunder')) {
    return 'bg-gradient-stormy';
  } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
    return 'bg-gradient-cloudy';
  } else if (conditionLower.includes('snow') || conditionLower.includes('blizzard')) {
    return 'bg-gradient-cloudy';
  } else if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
    return 'bg-gradient-sunny';
  } else if (conditionLower.includes('cloud') || conditionLower.includes('overcast')) {
    return 'bg-gradient-cloudy';
  }
  
  return 'bg-gradient-stormy';
};