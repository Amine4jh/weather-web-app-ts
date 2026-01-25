interface DayForecastCardProps {
  day: string;
  icon: string;
  description: string;
  temp: number;
}

export default function DayForecastCard({
  day,
  icon,
  description,
  temp,
}: DayForecastCardProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200">
      <div className="flex items-center space-x-3">
        <div className="text-sm font-medium text-blue-200 w-16">{day}</div>
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
          className="w-10 h-10"
        />
        <div className="text-sm text-white/80">{description}</div>
      </div>
      <div className="text-right">
        <div className="text-lg font-bold text-white">{temp}°</div>
        {/* <div className="text-xs text-white/60">{temp}°</div> */}
      </div>
    </div>
  );
}
