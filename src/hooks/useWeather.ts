import { useEffect, useState } from "react";
import {
  getCurrentWeather,
  getCurrentWeatherByCoords,
  getWeatherForecast,
} from "../services/weatherAPI";

interface currentWeather {
  dt: number;
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
  timezone: number;
}

interface forecastItem {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

interface forecastData {
  list: forecastItem[];
}

export function useWeather() {
  const [currentWeather, setCurrentWeather] = useState<currentWeather | null>(
    null,
  );
  const [forecast, setForecast] = useState<forecastItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState("C");

  // instead of 5-day / 3hours => 5-day / 24hours
  const handleForcast = (data: forecastData) => {
    const dailyData = data.list.filter((reading: forecastItem) =>
      reading.dt_txt.includes("12:00:00"),
    );
    return dailyData;
  };

  async function fetchWeatherByCity(city: string) {
    setLoading(true);
    setError(null);

    try {
      const [weatherData, foreCast] = await Promise.all([
        getCurrentWeather(city),
        getWeatherForecast(city),
      ]);
      setCurrentWeather(weatherData);
      const dailyData = handleForcast(foreCast);
      setForecast(dailyData);
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
          const dailyData = handleForcast(forecastData);
          setForecast(dailyData);
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "Failed to fetch weather data",
          );
        } finally {
          setLoading(false);
        }
      },
      (error) => {
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
