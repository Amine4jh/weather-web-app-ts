import { type JSX } from "react";
import { FiWind, FiEye, FiSunrise, FiSunset } from "react-icons/fi";
import { WiHumidity, WiBarometer } from "react-icons/wi";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";
import GridCard from "./components/GridCard";
import SunCard from "./components/SunCard";
import DefaultState from "./components/DefaultState";
import { useWeather } from "./hooks/useWeather";
import SearchBar from "./components/SearchBar";
import MainWeatherCard from "./components/MainWeatherCard";
import video from "./assets/bg-video.webm";
import DayForecastCard from "./components/DayForecastCard";

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
      icon: <WiHumidity size={32} />,
      value: currentWeather?.main.humidity,
      unit: "%",
      title: "Humidity",
    },
    {
      icon: <FiWind size={32} />,
      value: currentWeather?.wind.speed,
      unit: " m/s",
      title: "Wind Speed",
    },
    {
      icon: <WiBarometer size={32} />,
      value: currentWeather?.main.pressure,
      unit: " hPa",
      title: "Pressure",
    },
    {
      icon: <FiEye size={32} />,
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
      icon: <FiSunrise size={32} />,
      time: currentWeather?.sys.sunrise,
      timezone: currentWeather?.timezone,
      type: "Sunrise",
    },
    {
      icon: <FiSunset size={32} />,
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

  const handleDays = (date: string) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const apiDate = new Date(date.replace(" ", "T")).toDateString();
    if (apiDate === today.toDateString()) {
      return "Today";
    } else if (apiDate === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return apiDate.split(" ")[0];
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* If the video not working */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-900 via-purple-900 to-indigo-900"></div>
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={video} type="video/mp4" />
      </video>

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
            {/* <TemperatureToggle unit={unit} onToggle={toggleUnit} /> */}
          </div>

          {/* Loading State */}
          {loading && <LoadingState />}

          {/* Error State */}
          {error && !loading && (
            <ErrorState msg={error} onRetry={handleRetry} />
          )}

          {/* Weather Display */}
          {currentWeather && !loading && !error && (
            <div className="w-full max-w-7xl animate-fade-in-up">
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                {/* Main Weather Content */}
                <div className="flex-1 max-w-4xl">
                  {/* Main Weather Card */}
                  <MainWeatherCard weather={currentWeather} unit={unit} />

                  {/* Sunrise/Sunset */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-5">
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

                {/* 5-Day Forecast Sidebar */}
                <div className="w-full lg:w-80 xl:w-96">
                  <div className="glass-card p-4 md:p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-white mb-4 text-center">
                      5-Day Forecast
                    </h3>

                    <div className="space-y-3">
                      {forecast &&
                        forecast.map((day, index) => (
                          <DayForecastCard
                            key={index}
                            // day={new Date().toLocaleDateString(undefined, {weekday: 'long'})}
                            day={handleDays(day.dt_txt)}
                            icon={day.weather[0].icon}
                            description={day.weather[0].description}
                            temp={Math.round(day.main.temp)}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
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
            </div>
          )}
          {/* Default State */}
          {!currentWeather && !loading && !error && <DefaultState />}
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
