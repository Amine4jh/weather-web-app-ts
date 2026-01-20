const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL;
const GEO_URL = import.meta.env.VITE_GEO_BASE_URL;

interface CityData {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export async function getCurrentWeather(city: string) {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`,
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(
          `City ${city} not found, please check the spelling and try again.`,
        );
      } else if (response.status === 401) {
        throw new Error(
          `Invalid API Key, please check your OpenWeatherMap API configuration.`,
        );
      }
    } else {
      throw new Error(
        "Weather service is temporary unavailable. Please try again later.",
      );
    }

    const data = await response.json();

    if (!data.dt) {
      data.dt = Math.floor(Date.now() / 1000);
    }
    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        "Network error, please check your internet connection and try again.",
      );
    }
    throw error;
  }
}

export async function getCurrentWeatherByCoords(lat: number, lon: number) {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          `Invalid API Key, please check your OpenWeatherMap API configuration.`,
        );
      }
    } else {
      throw new Error(
        "Weather service is temporary unavailable. Please try again later.",
      );
    }

    const data = await response.json();

    if (!data.dt) {
      data.dt = Math.floor(Date.now() / 1000);
    }
    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        "Network error, please check your internet connection and try again.",
      );
    }
    throw error;
  }
}

export async function getWeatherForecast(city: string) {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`,
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(
          `City ${city} not found, please check the spelling and try again.`,
        );
      } else if (response.status === 401) {
        throw new Error(
          `Invalid API Key, please check your OpenWeatherMap API configuration.`,
        );
      }
    } else {
      throw new Error(
        "Weather service is temporary unavailable. Please try again later.",
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        "Network error, please check your internet connection and try again.",
      );
    }
    throw error;
  }
}

export async function searchCities(query: string) {
  try {
    const response = await fetch(
      `${GEO_URL}/direct?q=${query}&limit=5&appid=${API_KEY}`,
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          `Invalid API Key, please check your OpenWeatherMap API configuration.`,
        );
      }
    } else {
      throw new Error(
        "Weather service is temporary unavailable. Please try again later.",
      );
    }

    const data = await response.json();
    return data.map((city: CityData) => ({
      name: city.name,
      lat: city.lat,
      lon: city.lon,
      country: city.country,
      state: city.state || "",
    }));
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        "Network error, please check your internet connection and try again.",
      );
    }
    throw error;
  }
}
