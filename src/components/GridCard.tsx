import type { ReactNode } from "react";

interface GridCardProps {
  icon: ReactNode
  iconColor: string
  value: number | string | undefined
  unit: string
  title: string
}

export default function GridCard({ icon, iconColor, value, unit, title}: GridCardProps) {
  return(
    <div className="glass-card p-6 text-center hover-scale rounded-xl">
      <div className={`w-8 h-8 text-${iconColor}-400 mx-auto mb-3`} >
        {icon}
      </div>
      <p className="text-2xl font-bold text-white mb-1">
        {value}{unit}
      </p>
      <p className="text-blue-200 text-sm">{title}</p>
    </div>
  )
}
