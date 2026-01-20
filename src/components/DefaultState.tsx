import { FiThermometer } from "react-icons/fi";

export default function DefaultState () {
  return(
    <div className="text-center animate-fade-in">
      <FiThermometer className="w-16 h-16 text-blue-400 mx-auto mb-4 opacity-70" />
      <p className="text-white text-xl mb-2">
        Welcome to WeatherApp
      </p>
      <p className="text-blue-200">
        Enter a city name above to get the current weather
      </p>
    </div>
  )
}
