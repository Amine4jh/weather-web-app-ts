function LoadingState() {
  return (
    <div className="text-center animate-pulse">
      <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-white text-lg">Fetching weather data...</p>
    </div>
  )
}

export default LoadingState;
