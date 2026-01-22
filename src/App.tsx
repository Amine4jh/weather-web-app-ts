import { type JSX } from "react";
import {
  FiWind,
  FiEye,
  FiSunrise,
  FiSunset,
} from "react-icons/fi";
import { WiHumidity, WiBarometer } from "react-icons/wi";
import Header from "./components/Header";
import Footer from "./components/Footer";
import bg from "./assets/bg.webp";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";
import GridCard from "./components/GridCard";
import SunCard from "./components/SunCard";
import DefaultState from "./components/DefaultState";
import { useWeather } from "./hooks/useWeather";
import SearchBar from "./components/SearchBar";
import TemperatureToggle from "./components/TemperatureToggle";
import MainWeatherCard from "./components/MainWeatherCard";

// interface WeatherData {
//   name: string;
//   main: {
//     temp: number;
//     humidity: number;
//     pressure: number;
//     feels_like: number;
//   };
//   currentWeather: Array<{
//     main: string;
//     description: string;
//     icon: string;
//   }>;
//   wind: {
//     speed: number;
//   };
//   visibility: number;
//   sys: {
//     sunrise: number;
//     sunset: number;
//     country: string;
//   };
// }

function App() {
  const {
    currentWeather,
    forecast,
    loading,
    error,
    unit,
    fetchWeatherByCity,
    fetchWeatherByLocation,
    toggleUnit,
  } = useWeather();

  const weatherDetailsGridData: {
    icon: JSX.Element;
    value: number | undefined;
    unit: string;
    title: string;
  }[] = [
    {
      icon: <WiHumidity size={32} className="text-blue-400" />,
      value: currentWeather?.main.humidity,
      unit: "%",
      title: "Humidity",
    },
    {
      icon: <FiWind size={32} className="text-green-400" />,
      value: currentWeather?.wind.speed,
      unit: " m/s",
      title: "Wind Speed",
    },
    {
      icon: <WiBarometer size={32} className="text-purple-400" />,
      value: currentWeather?.main.pressure,
      unit: " hPa",
      title: "Pressure",
    },
    {
      icon: <FiEye size={32} className="text-yellow-400" />,
      value: currentWeather?.visibility,
      unit: " km",
      title: "Visibility",
    },
  ];

  const sunDetailsGridData: {
    icon: JSX.Element;
    time: number | undefined;
    timezone: number | undefined;
    type: string;
  }[] = [
    {
      icon: <FiSunrise size={32} className="text-orange-400" />,
      time: currentWeather?.sys.sunrise,
      timezone: currentWeather?.timezone,
      type: "Sunrise",
    },
    {
      icon: <FiSunset size={32} className="text-pink-400" />,
      time: currentWeather?.sys.sunset,
      timezone: currentWeather?.timezone,
      type: "Sunset",
    },
  ];

  const handleRetry = () => {
    if (currentWeather) {
      fetchWeatherByCity(currentWeather?.name);
    } else {
      fetchWeatherByCity("New York");
    }
  };

  const formatTime = (
    timestamp: number | undefined,
    timezoneOffset: number | undefined,
  ) => {
    if (timestamp && timezoneOffset) {
      return new Date((timestamp + timezoneOffset) * 1000).toLocaleTimeString(
        [],
        {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "UTC",
        },
      );
    }
  };

  // const [city, setCity] = useState('');
  // const [weather, setWeather] = useState<WeatherData | null>(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState('');

  // const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  // const BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL;

  // const fetchWeather = async (cityName: string) => {
  //   if (!cityName.trim()) return;

  //   setLoading(true);
  //   setError('');

  //   try {
  //     const response = await fetch(
  //       `${BASE_URL}?lat=35.570175&lon=-5.3742776&appid=${API_KEY}&units=metric`
  //     );

  //     if (!response.ok) {
  //       throw new Error('City not found');
  //     }

  //     const data: WeatherData = await response.json();
  //     setWeather(data);
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
  //     setWeather(null);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleSearch = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   fetchWeather(city);
  // };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video Background */}

      {/* <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={video} type="video/mp4" />
        <div className="absolute inset-0 bg-linear-to-br from-blue-900 via-purple-900 to-indigo-900"></div>
      </video> */}

      <div className="absolute top-0 left-0 w-full h-full z-0">
        <img src={bg} alt="" className="w-full h-full object-cover" />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>

      {/* Content */}
      <div className="relative z-20 min-h-screen flex flex-col">
        <Header />

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-6">
          {/* Search Form */}
          <div className="w-full max-w-2xl flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-5 m-10">
            <SearchBar
              onSearch={fetchWeatherByCity}
              onLocationSearch={fetchWeatherByLocation}
              loading={loading}
            />
            <TemperatureToggle unit={unit} onToggle={toggleUnit} />
          </div>

          {/* Loading State */}
          {loading && <LoadingState />}

          {/* Error State */}
          {error && !loading && (
            <ErrorState msg={error} onRetry={handleRetry} />
          )}

          {/* Weather Display */}
          {currentWeather && !loading && !error && (
            <div className="w-full max-w-4xl animate-fade-in-up">
              {/* Main Weather Card */}
              <MainWeatherCard weather={currentWeather} unit={unit} />

              {/* Weather Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 my-6 md:my-8">
                {weatherDetailsGridData &&
                  weatherDetailsGridData.map((card, index) => (
                    <GridCard
                      key={index}
                      icon={card.icon}
                      value={
                        card.title === "Visibility" &&
                        typeof card.value === "number"
                          ? (card.value / 1000).toFixed(1)
                          : card.value
                      }
                      unit={card.unit}
                      title={card.title}
                    />
                  ))}
              </div>

              {/* Sunrise/Sunset */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {sunDetailsGridData &&
                  sunDetailsGridData.map((card, index) => (
                    <SunCard
                      key={index}
                      icon={card.icon}
                      time={formatTime(card.time, card.timezone)}
                      type={card.type}
                    />
                  ))}
              </div>
            </div>
          )}

          {/* Default State */}
          {!currentWeather && !loading && !error && <DefaultState />}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
