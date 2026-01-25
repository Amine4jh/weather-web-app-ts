import { FiMapPin } from "react-icons/fi";

interface MainWeatherCardProps {
  weather: {
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
  };
  unit: string;
}

export default function MainWeatherCard({
  weather,
  unit,
}: MainWeatherCardProps) {
  const handleDate = (dt: number, timezoneOffset: number) => {
    const date = new Date((dt + timezoneOffset) * 1000);
    return date.toLocaleDateString([], {
      weekday: "long",
      day: "numeric",
      month: "short",
      timeZone: "UTC",
    });
  };

  const handleTime = (dt: number, timezoneOffset: number) => {
    return new Date((dt + timezoneOffset) * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    });
  };

  return (
    <div className="glass-card p-4 md:p-8 mb-6 text-center rounded-xl">
      <div className="flex items-center justify-center">
        <FiMapPin className="w-6 h-6 text-blue-400 mr-2" />
        <h2 className="text-2xl font-bold text-white">
          {weather.name}, {weather.sys.country}
        </h2>
      </div>
      <div className="flex items-center justify-center gap-5 mt-2 mb-4 text-sm font-semibold text-blue-200/80">
        <p>{handleDate(weather.dt, weather.timezone)}</p>
        <p>{handleTime(weather.dt, weather.timezone)}</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center mb-6">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
          alt={weather.weather[0].description}
          className="w-24 h-24"
        />
        <div className="md:ml-4 text-center md:text-left">
          <p className="text-4xl md:text-6xl font-bold text-white mb-2">
            {Math.round(weather.main.temp)}
            {unit === "C" ? "°C" : "°F"}
          </p>
          <p className="text-lg md:text-xl text-blue-200 capitalize">
            {weather.weather[0].description}
          </p>
        </div>
      </div>

      <p className="text-blue-200">
        Feels like {Math.round(weather.main.feels_like)}
        {unit === "C" ? "°C" : "°F"}
      </p>
    </div>
  );
}
