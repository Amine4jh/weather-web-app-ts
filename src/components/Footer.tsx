export default function Footer() {
  return (
    <footer className="p-6 text-center">
      <div className="glass-card p-4 max-w-md mx-auto rounded-xl">
        <p className="text-blue-200 text-sm mb-2">
          © {new Date().getFullYear()} WeatherApp. Data by{" "}
          <a
            href="https://openweathermap.org/"
            className="text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm underline"
          >
            OpenWeather
          </a>
        </p>
        <p className="text-blue-200 text-sm mb-2">
          Developed by{" "}
          <a
            href="https://amineajaha.vercel.app/"
            target="_blank"
            className="text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm underline"
          >
            Amine Ajaha
          </a>
        </p>
        <a
          href="https://amineajaha.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm underline"
        ></a>
      </div>
    </footer>
  );
}
