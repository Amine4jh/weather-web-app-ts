import { LuRefreshCw } from "react-icons/lu";

interface ErrorProps {
  msg: string;
  onRetry: () => void;
}

export default function ErrorState({ msg, onRetry }: ErrorProps) {
  return (
    <div className="w-full max-w-md p-6 rounded-2xl bg-red-500/20 backdrop-blur-md border border-red-400/30 text-white text-center animate-fade-in">
      <p className="text-lg font-semibold mb-2">Error</p>
      <p>{msg}</p>
      <p className="text-sm mt-2 opacity-80">
        Please check the city name and try again
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center mx-auto mt-5 space-x-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl px-6 py-3 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <LuRefreshCw className="w-5 h-5" />
          <span className="font-medium">Try Again</span>
        </button>
      )}
    </div>
  );
}
