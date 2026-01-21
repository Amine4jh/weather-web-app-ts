import { useEffect, useState } from "react";
import {
  getCurrentWeather,
  getCurrentWeatherByCoords,
  getWeatherForecast,
} from "../services/weatherAPI";

interface currentWeather {
  name: string;
  main: {
    temp: number;
    humidity: number;
    pressure: number;
    feels_like: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  visibility: number;
  sys: {
    sunrise: number;
    sunset: number;
    country: string;
  };
}

export function useWeather() {
  const [currentWeather, setCurrentWeather] = useState<currentWeather | null>(
    null,
  );
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState("C");

  async function fetchWeatherByCity(city: string) {
    setLoading(true);
    setError(null);

    try {
      const [weatherData, foreCast] = await Promise.all([
        getCurrentWeather(city),
        getWeatherForecast(city),
      ]);
      setCurrentWeather(weatherData);
      setForecast(foreCast);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch weather data",
      );
    } finally {
      setLoading(false);
    }
  }

  async function fetchWeatherByLocation() {
    if (!navigator.geolocation) {
      setError("GeoLocation is not supported by this browser");
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const weatherData = await getCurrentWeatherByCoords(
            latitude,
            longitude,
          );
          setCurrentWeather(weatherData);

          const forecastData = await getWeatherForecast(weatherData.name);
          setForecast(forecastData);
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "Failed to fetch weather data",
          );
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.log("Error because:", error);
        setError("Unable to retrieve your location");
        setLoading(false);
      },
    );
  }

  const toggleUnit = () => {
    setUnit(unit === "C" ? "F" : "C");
  };

  // Load default weather
  useEffect(() => {
    fetchWeatherByCity("New York");
  }, []);

  return {
    currentWeather,
    forecast,
    loading,
    error,
    unit,
    fetchWeatherByCity,
    fetchWeatherByLocation,
    toggleUnit,
  };
}
