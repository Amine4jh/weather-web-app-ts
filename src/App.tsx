import { useState } from 'react';
import { FiSearch, FiMapPin, FiWind, FiEye, FiSunrise, FiSunset } from 'react-icons/fi';
import { WiHumidity, WiBarometer } from 'react-icons/wi';
import Header from './components/Header';
import Footer from './components/Footer';
import bg from './assets/bg.webp';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import GridCard from './components/GridCard';
import SunCard from './components/SunCard';
import DefaultState from './components/DefaultState';

interface WeatherData {
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

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL;

  const fetchWeather = async (cityName: string) => {
    if (!cityName.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `${BASE_URL}?lat=35.570175&lon=-5.3742776&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data: WeatherData = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather(city);
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
          <form
            onSubmit={handleSearch}
            className="w-full max-w-md mb-8 animate-fade-in-up"
          >
            <div className="relative">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name..."
                className="w-full px-6 py-4 pr-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 shadow-lg"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-xl bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
                disabled={loading}
              >
                <FiSearch className="w-5 h-5 text-white" />
              </button>
            </div>
          </form>

          {/* Loading State */}
          {loading && <LoadingState />}

          {/* Error State */}
          {error && <ErrorState msg={error} />}

          {/* Weather Display */}
          {weather && !loading && (
            <div className="w-full max-w-4xl animate-fade-in-up">
              {/* Main Weather Card */}
              <div className="glass-card p-4 md:p-8 mb-6 text-center rounded-xl">
                <div className="flex items-center justify-center mb-4">
                  <FiMapPin className="w-6 h-6 text-blue-400 mr-2" />
                  <h2 className="text-2xl font-bold text-white">
                    {weather.name}, {weather.sys.country}
                  </h2>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center mb-6">
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                    alt={weather.weather[0].description}
                    className="w-24 h-24"
                  />
                  <div className="md:ml-4 text-center md:text-left">
                    <p className="text-4xl md:text-6xl font-bold text-white mb-2">
                      {Math.round(weather.main.temp)}°C
                    </p>
                    <p className="text-lg md:text-xl text-blue-200 capitalize">
                      {weather.weather[0].description}
                    </p>
                  </div>
                </div>

                <p className="text-blue-200">
                  Feels like {Math.round(weather.main.feels_like)}°C
                </p>
              </div>

              {/* Weather Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 my-6 md:my-8">
                {/* Humidity */}
                <GridCard 
                  icon={<WiHumidity size={32} />} 
                  iconColor='blue-400' 
                  value={weather.main.humidity} 
                  unit="%" 
                  title="Humidity" 
                />

                {/* Wind Speed */}
                <GridCard 
                  icon={<FiWind size={32} />} 
                  iconColor='green-400' 
                  value={weather.wind.speed} 
                  unit=" m/s" 
                  title="Wind Speed" 
                />

                {/* Pressure */}
                <GridCard 
                  icon={<WiBarometer size={32} />} 
                  iconColor='purple-400' 
                  value={weather.main.pressure} 
                  unit=" hPa" 
                  title="Pressure" 
                />

                {/* Visibility */}
                <GridCard 
                  icon={<FiEye size={32} />} 
                  iconColor='yellow-400' 
                  value={(weather.visibility / 1000).toFixed(1)} 
                  unit=" km" 
                  title="Visibility" 
                />
              </div>

              {/* Sunrise/Sunset */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <SunCard 
                  icon={<FiSunrise size={32} />}
                  iconColor='orange-400'
                  time={formatTime(weather.sys.sunrise)}
                  type="Sunrise"
                />

                <SunCard 
                  icon={<FiSunset size={32} />}
                  iconColor='pink-400'
                  time={formatTime(weather.sys.sunset)}
                  type="Sunset"
                />
              </div>
            </div>
          )}

          {/* Default State */}
          {!weather && !loading && !error && <DefaultState />}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
