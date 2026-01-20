interface ErrorProps {
  msg: string
}

export default function ErrorState({msg}: ErrorProps) {
  return (
    <div className="w-full max-w-md p-6 rounded-2xl bg-red-500/20 backdrop-blur-md border border-red-400/30 text-white text-center animate-fade-in">
      <p className="text-lg font-semibold mb-2">Error</p>
      <p>{msg}</p>
      <p className="text-sm mt-2 opacity-80">
        Please check the city name and try again
      </p>
    </div>
  )
}
