import type { ReactNode } from "react"

interface SunCardProps {
  icon: ReactNode
  iconColor: string
  time: string
  type: string
}

export default function SunCard({icon, iconColor, time, type}:SunCardProps) {
  return(
    <div className="glass-card p-6 text-center hover-scale rounded-xl">
      <div className={`w-8 h-8 text-${iconColor} mx-auto mb-3`} >
        {icon}
      </div>
      <p className="text-xl font-bold text-white mb-1">
        {time}
      </p>
      <p className="text-blue-200 text-sm">{type}</p>
    </div>
  )
}
