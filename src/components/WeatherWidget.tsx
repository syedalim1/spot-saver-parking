import React, { useState, useEffect } from "react";
import {
  Cloud,
  CloudRain,
  Sun,
  CloudSnow,
  CloudFog,
  CloudLightning,
  Loader2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  wind: number;
}

const WeatherWidget = ({ city = "New York" }: { city?: string }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, this would be an API call to a weather service
    // For demo purposes, we'll simulate loading and use mock data
    setLoading(true);

    setTimeout(() => {
      try {
        // Mock weather data
        const mockWeather: WeatherData = {
          temperature: Math.floor(Math.random() * 20) + 10, // 10-30°C
          condition: ["Sunny", "Cloudy", "Rainy", "Partly Cloudy"][
            Math.floor(Math.random() * 4)
          ],
          humidity: Math.floor(Math.random() * 50) + 30, // 30-80%
          wind: Math.floor(Math.random() * 30) + 5, // 5-35 km/h
        };

        setWeather(mockWeather);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch weather data");
        setLoading(false);
      }
    }, 1000);
  }, [city]);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="h-10 w-10 text-yellow-500" />;
      case "cloudy":
        return <Cloud className="h-10 w-10 text-gray-500" />;
      case "rainy":
        return <CloudRain className="h-10 w-10 text-blue-500" />;
      case "snowy":
        return <CloudSnow className="h-10 w-10 text-blue-200" />;
      case "foggy":
        return <CloudFog className="h-10 w-10 text-gray-400" />;
      case "stormy":
        return <CloudLightning className="h-10 w-10 text-purple-500" />;
      case "partly cloudy":
        return (
          <div className="relative">
            <Cloud className="h-10 w-10 text-gray-400" />
            <Sun className="h-6 w-6 text-yellow-500 absolute -top-1 -right-1" />
          </div>
        );
      default:
        return <Sun className="h-10 w-10 text-yellow-500" />;
    }
  };

  return (
    <Card className="overflow-hidden border border-blue-100 dark:border-blue-800">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Weather in {city}
            </h3>
            {loading ? (
              <div className="flex items-center mt-1 space-x-2">
                <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                <span className="text-sm text-gray-500">
                  Loading weather...
                </span>
              </div>
            ) : error ? (
              <p className="text-sm text-red-500">{error}</p>
            ) : weather ? (
              <div className="mt-1">
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {weather.temperature}°C
                  </span>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    {weather.condition}
                  </span>
                </div>
                <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400 space-x-4">
                  <span>Humidity: {weather.humidity}%</span>
                  <span>Wind: {weather.wind} km/h</span>
                </div>
              </div>
            ) : null}
          </div>

          {!loading && !error && weather && (
            <div className="ml-auto">{getWeatherIcon(weather.condition)}</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
