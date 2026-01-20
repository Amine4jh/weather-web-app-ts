export default function Footer(){
  return (
    <footer className="p-6 text-center">
      <div className="glass-card p-4 max-w-md mx-auto rounded-xl">
        <p className="text-blue-200 text-sm mb-2">
          © {(new Date()).getFullYear()} WeatherApp. Built with React & Tailwind CSS
        </p>
        <a
          href="https://amineajaha.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm underline"
        >
          Powered by Amine Ajaha
        </a>
      </div>
    </footer>
  )
}
